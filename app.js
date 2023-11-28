const app = () => {
    // ALERT MENU FUNCTIONALITY
    const alertTrigger = document.querySelector('#notificationBell');
    const alertContent = document.querySelector('#notificationContent');
  
    const toggleAlertContent = () => {
      alertContent.classList.toggle('notification-active');
      alertTrigger.ariaExpanded = alertContent.classList.contains('store-menu-active') ? 'true' : 'false';
    };
  
    alertTrigger.addEventListener('click', toggleAlertContent);
  
    // STORE-MENU FUNCTIONALITY
    const storeMenuTrigger = document.querySelector('#storeMenu');
    const storeMenuDropdown = document.querySelector('.store-menu-dropdown');
    const allMenuItems = storeMenuDropdown.querySelectorAll('[role="menuitem"]');
  
    const handleMenuEscapeKeyPress = (e) => {
      if (e.key === 'Escape') {
        toggleMenu();
      }
    };
  
    const handleMenuEnterKeyPress = (e) => {
      if (e.key === 'Enter') {
        toggleMenu();
      }
    };
  
    storeMenuTrigger.addEventListener('keyup', handleMenuEnterKeyPress);
  
    const handleMenuItemArrowKeyPress = (e, menuItemIndex) => {
      const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
      const isFirstMenuItem = menuItemIndex === 0;
      const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
      const prevMenuItem = allMenuItems.item(menuItemIndex - 1);
  
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (isLastMenuItem) {
          allMenuItems.item(0).focus();
          return;
        }
        nextMenuItem.focus();
      }
  
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (isFirstMenuItem) {
          allMenuItems.item(allMenuItems.length - 1).focus();
          return;
        }
        prevMenuItem.focus();
      }
    };
  
    const handleMenuItemEnterKeyPress = (e) => {
      if (e.key === 'Enter') {
        window.open('https://admin.shopify.com', '_blank');
      }
    };
  
    const openStoreMenu = () => {
      storeMenuTrigger.ariaExpanded = 'true';
      allMenuItems.item(0).focus();
      storeMenuDropdown.addEventListener('keyup', handleMenuEscapeKeyPress);
  
      allMenuItems.forEach((menuItem, menuItemIndex) => {
        menuItem.addEventListener('keyup', (e) => handleMenuItemArrowKeyPress(e, menuItemIndex));
        menuItem.addEventListener('keyup', (e) => handleMenuItemEnterKeyPress(e));
      });
    };
  
    const closeStoreMenu = () => {
      storeMenuTrigger.ariaExpanded = 'false';
      storeMenuDropdown.classList.remove('store-menu-active');
      storeMenuTrigger.focus()
    };
  
    const toggleMenu = () => {
      const isExpanded = storeMenuTrigger.attributes['aria-expanded'].value === 'true';
      storeMenuDropdown.classList.toggle('store-menu-active');
      isExpanded ? closeStoreMenu() : openStoreMenu();
    };

  
    storeMenuTrigger.addEventListener('click', toggleMenu);
  
    // TRIAL POPUP FUNCTIONALITY
    const trialPopupContainer = document.querySelector('#trialPopup');
    const trialPopup = document.querySelector('#trialPopupContent');
    const selectPlansButton = document.querySelector('.selectPlanButton');
    const cancelButton = document.querySelector('.cancelButton');
  
    selectPlansButton.addEventListener('click', () => {
      window.open('https://shopify.com/pricing', '_blank');
    });
  
    cancelButton.addEventListener('click', () => {
      trialPopupContainer.classList.add('hide-md','visibility')
      trialPopup.classList.add('popup-removed')
    });
  
    // Checkbox
    const HIDDEN_CLASS = 'hidden';
    const MARK_AS_DONE_CLASS = 'checkbox-done';
    const checkboxButtons = document.querySelectorAll('#accordion-item-checkbox');
    const accordionItems = document.querySelectorAll('.accordionItem');
    let taskCount = 0;
  
    const handleMarkAsDone = (checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index) => {
      notCompletedIcon.classList.add(HIDDEN_CLASS);
      loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);
      checkboxButtonStatus.ariaLabel = 'Loading, Please wait....';
  
      setTimeout(() => {
        loadingSpinnerIcon.classList.add(HIDDEN_CLASS);
        completedIcon.classList.remove(HIDDEN_CLASS);
        checkboxButton.ariaLabel += ' successfully checked';
        checkboxButton.ariaPressed = 'true';
        checkboxButton.classList.add(MARK_AS_DONE_CLASS);
        checkboxButtonStatus.ariaLabel = 'successfully checked...';
        taskCount += 1;
        updateProgressStatus();
        expandNextIncompleteStep(index);
      }, 2000);
    };
  
    const handleMarkAsNotDone = (checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index) => {
      completedIcon.classList.add(HIDDEN_CLASS);
      loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);
      checkboxButtonStatus.ariaLabel = 'Loading, Please wait....';
  
      setTimeout(() => {
        loadingSpinnerIcon.classList.add(HIDDEN_CLASS);
        notCompletedIcon.classList.remove(HIDDEN_CLASS);
        checkboxButton.ariaLabel = checkboxButton.ariaLabel.replace('successfully checked', '');
        checkboxButton.ariaPressed = 'false';
        checkboxButton.classList.remove(MARK_AS_DONE_CLASS);
        checkboxButtonStatus.ariaLabel = 'successfully unchecked...';
        taskCount -= 1;
        updateProgressStatus();
      }, 2000);
    };
  
    const handleMarkDoneOrNotDone = (checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index) => {
      const markedAsDone = checkboxButton.classList.contains(MARK_AS_DONE_CLASS);
      markedAsDone ? handleMarkAsNotDone(checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index) : handleMarkAsDone(checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index);
    };
  
    const updateProgressStatus = () => {
      const taskCountStatus = document.querySelector('.task-count');
      const progressBar = document.querySelector('#progressBar');
      taskCountStatus.textContent = taskCount;
      progressBar.value = taskCount;
    };
  
    checkboxButtons.forEach((checkboxButton, index) => {
      const notCompletedIcon = checkboxButton.querySelector('#not-completed-icon');
      const completedIcon = checkboxButton.querySelector('#completed-icon');
      const loadingSpinnerIcon = checkboxButton.querySelector('#loading-spinner-icon');
      const checkboxButtonStatus = document.querySelectorAll('#accordion-item-checkbox-status')[index];
  
      checkboxButton.addEventListener('click', () => {
        handleMarkDoneOrNotDone(checkboxButton, checkboxButtonStatus, notCompletedIcon, completedIcon, loadingSpinnerIcon, index);
      });
    });
  
    // ACCORDION FUNCTIONS
    const setupGuideContainer = document.querySelector('#setupGuide');
    const collapsibleButton = document.querySelector('#collapsibleButton');
    const accordionContainer = document.querySelector('#accordionContainer');
  
    const handleCollapsibleButtonClick = () => {
      collapsibleButton.classList.toggle('expanded');
      collapsibleButton.ariaExpanded = collapsibleButton.classList.contains('expanded') ? 'true' : 'false';
  
      if (collapsibleButton.classList.contains('expanded')) {
        accordionContainer.style.display = 'block';
        accordionContainer.style.height = 'auto';
        setupGuideContainer.style.height = 'auto';
      } else {
        accordionContainer.style.display = 'none';
        accordionContainer.style.height = '0px';
        setupGuideContainer.style.minHeight = '106px';
      }
    };
  
    collapsibleButton.addEventListener('click', handleCollapsibleButtonClick);
  
    accordionItems.forEach((item, index) => {
      const header = item.querySelector('.accordionTitle');
      const img = item.querySelector('img');
  
      header.addEventListener('click', () => {
        header.classList.toggle('opened');
        const isOpened = header.classList.contains('opened');
  
        if (isOpened) {
          item.classList.add('open');
          item.ariaExpanded = 'true';
          img.classList.remove('hidden')
          const checkboxButton = item.querySelector('#accordion-item-checkbox');
          checkboxButton.focus();

          // Keyboard Navigation
          let currentIndex = 0;
           item.addEventListener('keydown', (event) => {
             const actionButton = item.querySelector('.accordionButton');
             const actionButtonTwo = item.querySelector('.accordionButton-two');
             const link = item.querySelector('a');
             const itemArray = [link, actionButton, actionButtonTwo];
         
             if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
               itemArray[currentIndex].focus();
               currentIndex = (currentIndex + 1) % itemArray.length;
             } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
               currentIndex = (currentIndex - 1 + itemArray.length) % itemArray.length;
               itemArray[currentIndex].focus();
             } else if (event.key ==='ArrowDown' && currentIndex === itemArray.length - 1) {
                item.focus();
             }
         })
        } else {
          item.classList.remove('open');
          item.ariaExpanded = 'false';
          img.classList.add('hidden');
        }
  
        closeAccordion(index);
      });
    });
  
    const closeAccordion = (index1) => {
      accordionItems.forEach((item2, index2) => {
        if (index1 !== index2) {
          item2.classList.remove('open');
          item2.ariaExpanded = 'false';
          const image = item2.querySelector('img');
          const link = item2.querySelector('a');
          const accordionButton = item2.querySelector('.accordionButton');
          const accordionButtonTwo = item2.querySelector('.accordionButton-two');
          image.classList.add('hidden');
          link.tabIndex = -1;
          accordionButton.tabIndex = -1;
  
          if (accordionButtonTwo) {
            accordionButtonTwo.tabIndex = -1;
          }
        }
      });
    };
  
    const closeCurrentAccordion = () => {
      accordionItems.forEach((item2) => {
        const image = item2.querySelector('img');
        const link = item2.querySelector('a');
        const accordionButton = item2.querySelector('.accordionButton');
        const accordionButtonTwo = item2.querySelector('.accordionButton-two');
  
        item2.classList.remove('open');
        item2.ariaExpanded = 'false';
        image.classList.add('hidden');
        link.tabIndex = -1;
        accordionButton.tabIndex = -1;
  
        if (accordionButtonTwo) {
          accordionButtonTwo.tabIndex = -1;
        }
      });
    };
  
    const expandNextIncompleteStep = (index) => {
      closeCurrentAccordion();
      Array.from(checkboxButtons).some((checkboxButton, idx) => {
        if (checkboxButton.ariaPressed === 'false') {
          const accordionItem = accordionItems[idx];
  
          if (accordionItem) {
            const image = accordionItem.querySelector('img');
            const link = accordionItem.querySelector('a');
            const accordionButton = accordionItem.querySelector('.accordionButton');
            const accordionButtonTwo = accordionItem.querySelector('.accordionButton-two');
  
            accordionItem.classList.add('open');
            accordionItem.ariaExpanded = 'true';
            image.classList.remove('hidden');
            link.tabIndex = 0;
            accordionButton.tabIndex = 0;
  
            if (accordionButtonTwo) {
              accordionButtonTwo.tabIndex = 0;
            }
  
            return true;
          }
        }
  
        return false;
      });
    };
  };
  
  app();
  