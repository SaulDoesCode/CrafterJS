"use strict";
((doc, root) => {

  Craft.ripple = (SelectorOrNode, options) => queryEach(SelectorOrNode, element => element.onmousedown = e => element.appendChild(Craft.make_element('ripple-effect', '', options || {}, true, {
    x: e.clientX,
    y: e.clientY
  })));

  Craft.newComponent('ripple-effect', {
    inserted() {
      let ripple = dom(this),
        color, timing = ripple.hasAttr("timing") ? ripple.getAttr("timing") : 1600,
        rect = this.parentNode.getBoundingClientRect(),
        diameter = Math.max(rect.width, rect.height);
      if (this.parentNode.hasAttr("ripple")) color = ripple.parentNode.getAttr("ripple");
      else if (ripple.hasAttr("color-accent")) color = ripple.getAttr("color-accent");
      else if (ripple.hasAttr("color")) color = ripple.getAttr("color");

      ripple.css({
        width: diameter + 'px',
        height: diameter + 'px',
        animation: `ripple ${timing}ms ease`
      }).move(parseInt(this.getAttribute('x')) - rect.left - (diameter / 2), parseInt(this.getAttribute('y')) - rect.top - (diameter / 2));

      if (is.Def(color)) this.style.backgroundColor = color;
      setTimeout(() => this.remove(), timing);
    }
  });

  Craft.notification = (msg, state, side, duration) => {
    if (is.Num(state)) {
      side = state;
      duration = side;
      state = '';
    }
    if (is.Num(side)) {
      side = side === 1 ? 'top-left' : side === 2 ? 'top-right' : side === 3 ? 'bottom-left' : side === 4 ? 'bottom-right' : side === 5 ? 'bottom-middle' : side === 6 ? 'top-middle' : 'top-left';
    }
    let host = query(`.notifications-${side}`);
    if (host === null) {
      doc.body.insertBefore(dom().div('', `class=notifications-${side}`, true), doc.body.firstChild);
      host = query(`.notifications-${side}`);
    }
    host.appendChild(Craft.make_element('craft-notification', msg, {
      duration: duration,
      side: side,
      state: state
    }, true));
  }

  Craft.newComponent('craft-notification', {
    inserted() {
        let note = dom(this);
        if (note.hasAttr('duration') && parseInt(note.getAttr('duration'), 10) !== 0) setTimeout(() => note.remove(), parseInt(note.getAttr('duration'), 10) || 3000);
        if (note.hasAttr('message')) note.html(note.getAttr('message'));
        note.append(dom().div('X', 'class=notification-close', true));
        this.clickEvent = On('.notification-close', this).Click(e => this.remove());
      },
      destroyed() {
        this.clickEvent.Off();
      }
  })

  var ContextMenus = [];

  Craft.newComponent('context-menu', {
    inserted() {
        this.show = false;
        let ctx = dom(this);
        ctx.hasAttr('scope') ? this.contextmenuEvent = On('contextmenu', ctx.getAttr('scope'), e => this.Show(true, e)) : console.error('context-menu : No Scope Attribute found');
        ContextMenus.push(this);
      },
      destroyed() {
        ContextMenus = Craft.omit(ContextMenus, this);
        this.contextmenuEvent.Off();
      },
      Show(Show, ev) {
        let el = dom(this);
        if (is.Def(ev)) ev.preventDefault();
        if (Show) {
          el.addClass('context-menu-active').move((ev.clientX + 5), (ev.clientY + 5));
          this.show = true;
        } else if (el.gotClass('context-menu-active')) {
          el.stripClass('context-menu-active');
          this.show = false;
        }
      }
  });

  Craft.newComponent('check-box', {
    created() {
        let el = this;
        el.Check();
        el.OnClick = On(el).Click(e => {
          el.value = !el.value;
          el.Check();
        });
      },
      toggle(checked) {
        let el = dom(this),
          chck = 'checked';
        checked === true || (is.Undef(el.value) && el.getAttr(chck) === 'false') ? el.setAttr(chck, 'true') : el.setAttr(chck, 'false');
      },
      OnCheck(func) {
        if (is.Func(func)) this.func = func;
      },
      setValue(val) {
        this.value = val;
      },
      Check() {
        let el = dom(this),
          chck = 'checked',
          t = 'true',
          f = 'false';
        if (is.Undef(el.value) && el.hasAttr(chck)) {
          let checked = el.getAttr(chck);
          if (checked === t) this.value = true;
          if (checked === f) this.value = false;
        } else el.value ? el.setAttr(chck, t) : el.setAttr(chck, f);
        if (is.Func(this.func)) el.func(this.value);
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === "checked") this.Check();
      },
      destroyed() {
        this.OnClick.Off();
      }
  });

  Craft.newComponent('toggle-button', {
    created() {
        let el = dom(this),
          t = 'true',
          f = 'false';
        el.open ? el.setAttr('open', t) : el.setAttr('open', f);
        this.click = On(this).Click(e => {
          this.open = !this.open;
          el.setAttr('open', this.open ? t : f);
        });
        el.append(dom().span('', 'class=toggle', true));
      },
      onToggle(func) {
        if (is.Func(func)) this.func = func;
      },
      toggle(open) {
        open === true || (is.Undef(open) && this.getAttribute('open') === 'false') ? this.setAttribute('open', 'true') : this.setAttribute('open', 'false');
      },
      attr(attrName, oldVal, newVal) {
        if (attrName === 'open') {
          this.open = this.getAttribute('open') === 'true';
          if (is.Func(this.func)) this.func(this.open);
        }
      },
      destroyed() {
        this.click.Off();
      }
  });

  Craft.newComponent('grid-host', {
    extends: 'div'
  });
  Craft.newComponent('grid-row', {
    extends: 'div'
  });

  Craft.newComponent('text-collapser', {
    created() {
        let el = dom(this),
          txt = el.html();
        el.html("");

        el.append(dom().label(el.hasAttr('summary') ? `&#9660; \t ${el.getAttr('summary')}` : '&#9654;', 'id=indicator', true));
        el.append(dom().label(txt, 'id=text', true));
        this.open = el.hasAttr('open');

        this.onClick = On('#indicator', this).Click(e => this.toggle());
      },
      toggle(open) {
        is.Def(open) ? this.open = open : this.open = !this.open;
        this.open ? this.setAttribute('open', '') : this.removeAttribute('open');
      },
      attr(name, oldVal, newVal) {
        if (name === 'open') this.open = this.hasAttribute('open');
      },
      destroyed() {
        this.onClick.Off();
      }
  });

  let InputAttributes = ["name", "pattern", "value", "max", "maxlength", "min", "minlength", "size", "autofocus", "autocomplete", "disabled", "form_id", "required"];

  Craft.newComponent('material-input', {
    inserted() {
        let el = dom(this),
          input = dom(Craft.make_element("input", '', 'type=text', true));
        el.html("");

        if (el.hasAttr("type")) {
          if (el.getAttr("type") !== "submit" && el.getAttr("type") !== "button" && el.getAttr("type") !== "range") {
            input.setAttr("type", el.getAttr("type"));
          } else console.warn("<material-input> is only for text type inputs not buttons,ranges,submits it will default to text if wrong type is chosen");
        } else input.setAttr("type", "text");

        forEach(InputAttributes, attr => {
          if (el.hasAttr(attr)) input.setAttr(attr, el.getAttr(attr));
        });

        el.append(input);
        el.append(dom().span());
        input = dom(el.query('input'));
        let clearText = query('span',this);

        this.labelEffects = () => {
          if (this.value.length > 0) {
            input.addClass('inputhastext');
            clearText.style.display = 'block';
          } else {
            input.stripClass('inputhastext');
            clearText.style.display = '';
          }
        }

        this.onblur = this.labelEffects;

        if (el.hasAttr("label") || el.hasAttr("placeholder")) {
          let label = dom().label();
          label.innerHTML = el.getAttr("label") || el.getAttr("placeholder");
          el.append(label);
          this.labelEffects();
        }

        this.OnInput = On(input).Input(e => {
          if (el.hasAttr("label") || el.hasAttr("placeholder")) this.labelEffects();
        });

        this.OnClick = On('span',this).Click(e => {
          this.value = '';
          this.labelEffects();
        });

        el.append(clearText);
      },
      attr(attrName, oldVal, newVal) {
        let el = dom(this),
          input = dom('input', this);
        InputAttributes.forEach(i => {
          if (i === attrName) {
            if (el.hasAttr(i)) input.setAttr(i, newVal);
            else if (input.hasAttribute(i) && !el.hasAttr(i)) input.stripAttr(i, newVal);
          }
        });
      },
      set value(val) {
        let input = dom('input', this);
        input.text(val);
        input.value.length > 0 || input.value == ' ' ? input.addClass('inputhastext') : input.stripClass('inputhastext');
      },
      get value() {
        return query('input', this).value;
      }
  });

  On('blur', e => queryEach('context-menu', el => el.Show()));
  On(doc).Click(e => {
    if (e.target.parentNode.tagName !== 'CONTEXT-MENU' && e.target.tagName !== 'SECTION') ContextMenus.forEach(el => el.Show());
  });

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      let element = e.target;
      if (element.hasAttribute('ripple')) Craft.ripple(element);
      if (element.hasAttribute('tooltip')) {
        queryEach(`[owner="${e.target.parentNode.tagName}${e.target.tagName}${e.target.className}"]`, el => {
          if (is.Def(el.TooltipOwnerObserver)) el.TooltipOwnerObserver.disconnect();
          if (is.Def(el.EventListeners)) el.EventListeners.forEach(ev => ev.Off());
          el.remove();
        });
        let show = false,
          tooltip = dom().span('', element.hasAttribute('tooltip-direction') ? `direction=${element.getAttribute('tooltip-direction')}&class=craft-tooltip` : 'direction=right&class=craft-tooltip', true);

        tooltip.EventListeners = [];
        tooltip.innerHTML = element.getAttribute('tooltip');
        tooltip.setAttribute('owner', `${e.target.parentNode.tagName}${e.target.tagName}${e.target.className}`);
        if (element.hasAttribute('ripple')) tooltip.style.borderColor = element.getAttribute('ripple');
        if (element.hasAttribute('color-accent')) tooltip.style.borderColor = element.getAttribute('color-accent');

        let moveTooltip = () => {
          let movecheck = setInterval(() => {
            Craft.mouse.observe(show);
            show ? dom(tooltip).move(Craft.mouse.x, Craft.mouse.y) : clearInterval(movecheck);
          }, 5);
        }

        tooltip.EventListeners.push(On(element).Mouseenter(ev => {
          show = true;
          moveTooltip();
          if (ev.target !== element || ev.target.parentNode !== element) {
            tooltip.style.display = show ? 'block' : 'none';
            setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
          } else {
            if (element.hasAttribute('tooltip-delay')) setTimeout(() => {
              tooltip.style.display = show ? 'block' : 'none';
              setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
            }, parseInt(element.getAttribute('tooltip-delay')));
            else {
              tooltip.style.display = show ? 'block' : 'none';
              setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
            }
          }
        }));
        tooltip.EventListeners.push(On(element).Mouseleave(ev => {
          show = false;
          tooltip.style.display = show ? 'block' : 'none';
          setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
        }));

        tooltip.hostObserver = new MutationObserver(mutations => {
          mutations.forEach(mut => {
            if (mut.type === 'attributes') {
              if (mut.attributeName === 'tooltip' && element.hasAttribute('tooltip')) {
                tooltip.innerHTML = element.getAttribute('tooltip');
              } else if (mut.attributeName === 'tooltip-delay' && element.hasAttribute('tooltip-delay')) {
                setTimeout(() => {
                  tooltip.style.display = show ? 'block' : 'none';
                  setTimeout(() => tooltip.style.opacity = show ? '1' : '0', 10);
                }, parseInt(element.getAttribute('tooltip-delay')));
              } else if (mut.attributeName === 'tooltip-direction' && element.hasAttribute('tooltip-direction')) {
                tooltip.setAttribute('direction', element.getAttribute('tooltip-direction'));
              } else if (!element.hasAttribute('tooltip')) {
                if (is.Def(tooltip.hostObserver)) tooltip.hostObserver.disconnect();
                if (is.Def(tooltip.EventListeners)) tooltip.EventListeners.forEach(ev => ev.Off());
                tooltip.remove();
              }
            }
          });
        });
        tooltip.hostObserver.observe(element, {
          attributes: true
        });

        doc.body.appendChild(tooltip);
      }
      if (element.hasAttribute('movable')) {
        element.style.position = 'absolute';
        let move, rect,
          movable = false,
          movehandle = query('[movehandle]', element);

        On(movehandle === null ? element : movehandle).Mousedown(e => {
          movable = true;
          rect = element.getBoundingClientRect();
          move = setInterval(() => {
            Craft.mouse.observe(movable);
            movable ? dom(element).move(Craft.mouse.x - e.clientX + rect.left, Craft.mouse.y - e.clientY + rect.top) : clearInterval(move);
          }, 5);
        });

        On(doc).Mouseup(e => movable = false);
      }
    }
  });
})(document, window);
