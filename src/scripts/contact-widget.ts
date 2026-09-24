const firstQuestion = 'Hola, soy Zeta, del equipo ZGAMES. Cuéntame en qué punto estás y te oriento en dos minutos.';
const firstOptions = [
  'Construir mi primer proyecto',
  'Ya tengo un producto y quiero mejorarlo',
  'Saber precios y plazos',
  'Hablar con una persona',
];
const productOptions = ['Una app móvil', 'Una plataforma web', 'Algo con gamificación', 'Todavía no lo sé'];

export function initializeContactWidget(): void {
  const widget = document.querySelector<HTMLElement>('[data-contact-widget]');
  if (!widget) return;

  const backToTop = document.querySelector<HTMLElement>('.back-to-top--floating');
  const launcher = widget.querySelector<HTMLButtonElement>('.contact-widget__launcher');
  const panel = widget.querySelector<HTMLElement>('.contact-widget__panel');
  const closeButton = widget.querySelector<HTMLButtonElement>('.contact-widget__close');
  const messages = widget.querySelector<HTMLElement>('[data-chat-messages]');
  const choices = widget.querySelector<HTMLElement>('[data-chat-choices]');
  const teaser = widget.querySelector<HTMLElement>('[data-contact-teaser]');
  const teaserClose = widget.querySelector<HTMLButtonElement>('[data-teaser-close]');
  const teaserOpen = widget.querySelector<HTMLButtonElement>('[data-teaser-open]');

  if (!launcher || !panel || !closeButton || !messages || !choices || !teaser || !teaserClose || !teaserOpen) return;

  const clamp = (value: number, minimum: number, maximum: number) =>
    Math.min(Math.max(value, minimum), Math.max(minimum, maximum));

  const getVerticalBounds = (height: number) => {
    return {
      minTop: 0,
      maxTop: window.innerHeight - height,
    };
  };

  let userHasMovedWidget = false;

  const updateEdge = () => {
    const bounds = widget.getBoundingClientRect();
    widget.dataset.edge = bounds.left + bounds.width / 2 < window.innerWidth / 2 ? 'left' : 'right';
  };

  const placeWidgetBesideArrow = () => {
    if (!backToTop) return;
    const arrowBounds = backToTop.getBoundingClientRect();
    const widgetBounds = widget.getBoundingClientRect();
    const transform = getComputedStyle(backToTop).transform;
    let translateY = 0;
    if (transform !== 'none') {
      try {
        translateY = new DOMMatrixReadOnly(transform).m42;
      } catch {
        // Keep the measured box position if the browser cannot parse the transform.
      }
    }
    const untransformedArrowTop = arrowBounds.top - translateY;
    const top = clamp(
      untransformedArrowTop + arrowBounds.height - widgetBounds.height,
      0,
      window.innerHeight - widgetBounds.height,
    );

    widget.style.top = `${top}px`;
    widget.style.bottom = 'auto';
    widget.style.left = `${widgetBounds.left}px`;
    widget.style.right = 'auto';
    updateEdge();
  };

  const updatePanelPlacement = () => {
    const widgetBounds = widget.getBoundingClientRect();
    const viewportPadding = 16;
    const panelGap = 14;
    const panelWidth = Math.min(370, window.innerWidth - viewportPadding * 2);
    const targetLeft = clamp(
      widgetBounds.left + (widgetBounds.width - panelWidth) / 2,
      viewportPadding,
      window.innerWidth - panelWidth - viewportPadding,
    );
    const spaceAbove = widgetBounds.top - panelGap - viewportPadding;
    const spaceBelow = window.innerHeight - widgetBounds.bottom - panelGap - viewportPadding;
    const availableHeight = Math.max(1, Math.min(560, window.innerHeight - 32, Math.max(spaceAbove, spaceBelow)));

    panel.style.left = `${targetLeft - widgetBounds.left}px`;
    panel.style.right = 'auto';
    widget.dataset.panelPlacement = spaceAbove >= spaceBelow ? 'above' : 'below';
    widget.style.setProperty('--contact-panel-max-height', `${availableHeight}px`);
  };

  const updateTeaserPlacement = () => {
    if (teaser.hidden) return;
    const widgetBounds = widget.getBoundingClientRect();
    const teaserBounds = teaser.getBoundingClientRect();
    let top = clamp(
      widgetBounds.top + (widgetBounds.height - teaserBounds.height) / 2,
      16,
      window.innerHeight - teaserBounds.height - 16,
    );

    if (backToTop?.classList.contains('is-visible')) {
      const arrowBounds = backToTop.getBoundingClientRect();
      const overlapsArrow = teaserBounds.left < arrowBounds.right && teaserBounds.right > arrowBounds.left &&
        top < arrowBounds.bottom && top + teaserBounds.height > arrowBounds.top;
      if (overlapsArrow) {
        top = clamp(arrowBounds.top - teaserBounds.height - 12, 16, window.innerHeight - teaserBounds.height - 16);
      }
    }
    teaser.style.top = `${top - widgetBounds.top + teaserBounds.height / 2}px`;
  };

  const clampWidgetWithinViewport = () => {
    const bounds = widget.getBoundingClientRect();
    const { minTop, maxTop } = getVerticalBounds(bounds.height);
    const top = clamp(bounds.top, minTop, maxTop);
    const left = clamp(bounds.left, 0, window.innerWidth - bounds.width);
    widget.style.top = `${top}px`;
    widget.style.bottom = 'auto';
    widget.style.left = `${left}px`;
    widget.style.right = 'auto';
    updateEdge();
    updateTeaserPlacement();
  };

  placeWidgetBesideArrow();
  updateTeaserPlacement();
  widget.classList.add('is-ready');

  if ('ResizeObserver' in window) new ResizeObserver(updateTeaserPlacement).observe(teaser);
  if (backToTop) {
    new MutationObserver(() => {
      updateTeaserPlacement();
      if (!userHasMovedWidget) placeWidgetBesideArrow();
    }).observe(backToTop, { attributes: true, attributeFilter: ['class'] });
  }
  let activePointerId: number | null = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerOffsetX = 0;
  let pointerOffsetY = 0;
  let isDragging = false;
  let suppressClick = false;
  let dragScrollFrame = 0;
  let latestPointerY = 0;

  const autoScrollDuringDrag = () => {
    dragScrollFrame = 0;
    if (!isDragging || activePointerId === null) return;

    const edgeSize = 48;
    const maxSpeed = 18;
    let scrollDelta = 0;
    if (latestPointerY < edgeSize) {
      scrollDelta = -Math.ceil(((edgeSize - latestPointerY) / edgeSize) * maxSpeed);
    } else if (latestPointerY > window.innerHeight - edgeSize) {
      scrollDelta = Math.ceil(((latestPointerY - (window.innerHeight - edgeSize)) / edgeSize) * maxSpeed);
    }

    if (!scrollDelta) return;
    const previousScrollY = window.scrollY;
    window.scrollBy(0, scrollDelta);
    if (window.scrollY !== previousScrollY) {
      dragScrollFrame = window.requestAnimationFrame(autoScrollDuringDrag);
    }
  };
  const moveWidget = (left: number, top: number) => {
    const bounds = widget.getBoundingClientRect();
    const { minTop, maxTop } = getVerticalBounds(bounds.height);
    widget.style.left = `${clamp(left, 0, window.innerWidth - bounds.width)}px`;
    widget.style.right = 'auto';
    widget.style.top = `${clamp(top, minTop, maxTop)}px`;
    widget.style.bottom = 'auto';
    updateEdge();
    updateTeaserPlacement();
  };

  const finishWidgetDrag = () => {
    clampWidgetWithinViewport();
    if (!panel.hidden) updatePanelPlacement();
  };

  launcher.addEventListener('pointerdown', (event: PointerEvent) => {
    if (!panel.hidden || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const bounds = widget.getBoundingClientRect();
    activePointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerOffsetX = event.clientX - bounds.left;
    pointerOffsetY = event.clientY - bounds.top;
    latestPointerY = event.clientY;
    isDragging = false;
    launcher.setPointerCapture(event.pointerId);
  });

  launcher.addEventListener('pointermove', (event: PointerEvent) => {
    if (event.pointerId !== activePointerId) return;
    latestPointerY = event.clientY;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    if (!isDragging && Math.hypot(deltaX, deltaY) < 7) return;
    isDragging = true;
    userHasMovedWidget = true;
    widget.classList.add('is-dragging');
    moveWidget(event.clientX - pointerOffsetX, event.clientY - pointerOffsetY);
    if (!dragScrollFrame) dragScrollFrame = window.requestAnimationFrame(autoScrollDuringDrag);
    event.preventDefault();
  });

  const finishPointerInteraction = (event: PointerEvent) => {
    if (event.pointerId !== activePointerId) return;
    if (dragScrollFrame) window.cancelAnimationFrame(dragScrollFrame);
    dragScrollFrame = 0;
    if (isDragging) {
      finishWidgetDrag();
      widget.classList.remove('is-dragging');
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
    activePointerId = null;
    isDragging = false;
  };

  launcher.addEventListener('pointerup', finishPointerInteraction);
  launcher.addEventListener('pointercancel', finishPointerInteraction);
  launcher.addEventListener('dragstart', (event) => event.preventDefault());

  window.addEventListener('resize', () => {
    if (userHasMovedWidget) clampWidgetWithinViewport();
    else placeWidgetBesideArrow();
    if (!panel.hidden) updatePanelPlacement();
    updateTeaserPlacement();
  });

  const appendMessage = (text: string, sender: 'assistant' | 'user') => {
    const message = document.createElement('p');
    message.className = `contact-widget__message contact-widget__message--${sender}`;
    message.textContent = text;
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const waLink = (text: string) => {
    const number = widget.dataset.whatsappNumber?.replace(/\D/g, '') ?? '';
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  const showActions = (includeCase: boolean) => {
    choices.replaceChildren();
    if (includeCase) {
      const caseLink = document.createElement('a');
      caseLink.className = 'contact-widget__action contact-widget__action--primary';
      caseLink.href = '#ecosystem';
      caseLink.textContent = 'VER CASO DE GAMIFICACIÓN';
      caseLink.addEventListener('click', closePanel);
      choices.append(caseLink);
    }

    const callLink = document.createElement('a');
    callLink.className = 'contact-widget__action contact-widget__action--primary';
    callLink.href = waLink('Hola, quisiera agendar una llamada de 30 minutos con ZGames.');
    callLink.target = '_blank';
    callLink.rel = 'noopener noreferrer';
    callLink.textContent = 'AGENDAR LLAMADA DE 30 MIN';
    choices.append(callLink);

    const restart = document.createElement('button');
    restart.className = 'contact-widget__action contact-widget__action--secondary';
    restart.type = 'button';
    restart.textContent = 'Volver al inicio';
    restart.addEventListener('click', startConversation);
    choices.append(restart);
  };

  const showOptions = (options: string[], handler: (choice: string) => void) => {
    choices.replaceChildren();
    for (const option of options) {
      const button = document.createElement('button');
      button.className = 'contact-widget__choice';
      button.type = 'button';
      button.textContent = option;
      button.addEventListener('click', () => handler(option));
      choices.append(button);
    }
  };

  const finishWithProduct = (product: string) => {
    if (product === 'Algo con gamificación') {
      appendMessage(
        'Venimos del mundo del juego: misiones, rankings, ligas y tiendas de puntos que sostienen la motivación más allá de la primera semana.',
        'assistant',
      );
      showActions(true);
      return;
    }

    const description = product === 'Todavía no lo sé'
      ? 'No pasa nada. Te ayudamos a aterrizar la idea y encontrar el producto que mejor encaje con tus objetivos.'
      : `Perfecto. Podemos ayudarte a diseñar y construir ${product.toLowerCase()} a la medida de tus objetivos.`;
    appendMessage(description, 'assistant');
    showActions(false);
  };

  const askProduct = (prompt = 'Perfecto. ¿Qué tipo de producto tienes en mente?') => {
    appendMessage(prompt, 'assistant');
    showOptions(productOptions, finishWithProduct);
  };

  const handleFirstChoice = (choice: string) => {
    appendMessage(choice, 'user');
    if (choice === 'Construir mi primer proyecto') {
      askProduct();
    } else if (choice === 'Ya tengo un producto y quiero mejorarlo') {
      askProduct('Perfecto. ¿Qué producto tienes en mente?');
    } else if (choice === 'Saber precios y plazos') {
      askProduct('Claro. ¿Qué tipo de proyecto quieres cotizar?');
    } else {
      appendMessage('¡Claro! Escríbenos por WhatsApp y una persona del equipo te ayudará.', 'assistant');
      choices.replaceChildren();
      const contact = document.createElement('a');
      contact.className = 'contact-widget__action contact-widget__action--primary';
      contact.href = waLink('Hola, quisiera hablar con una persona del equipo de ZGames.');
      contact.target = '_blank';
      contact.rel = 'noopener noreferrer';
      contact.textContent = 'HABLAR POR WHATSAPP';
      choices.append(contact);
      const restart = document.createElement('button');
      restart.className = 'contact-widget__action contact-widget__action--secondary';
      restart.type = 'button';
      restart.textContent = 'Volver al inicio';
      restart.addEventListener('click', startConversation);
      choices.append(restart);
    }
  };

  function startConversation() {
    messages.replaceChildren();
    appendMessage(firstQuestion, 'assistant');
    showOptions(firstOptions, handleFirstChoice);
  }

  const openPanel = () => {
    teaser.hidden = true;
    panel.hidden = false;
    updatePanelPlacement();
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Cerrar chat de contacto');
    widget.classList.add('is-open');
    choices.querySelector<HTMLButtonElement>('button')?.focus();
  };

  const closePanel = () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Abrir chat de contacto. Arrastra para mover.');
    widget.classList.remove('is-open');
    launcher.focus();
  };

  launcher.addEventListener('click', () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    if (panel.hidden) openPanel();
    else closePanel();
  });
  teaserOpen.addEventListener('click', openPanel);
  teaserClose.addEventListener('click', () => {
    teaser.hidden = true;
    launcher.focus();
  });
  closeButton.addEventListener('click', closePanel);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  startConversation();
}
