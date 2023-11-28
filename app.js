const app = () => {
    /// ALERT MENU FUNCTIONALITY ///
// When a user clicks on the notification bell, 
// It show popup a dropdown panel that shows me an empty list of notifications since I have none yet. 
// When I click on the notification bell again, this dropdown panel is closed.
    const alertTrigger = document.querySelector('#notificationBell');  //get the alert button
    const alertContent = document.querySelector('#notificationContent'); //get the notification dropdown
    const toggleAlertContent = () => {
      // toggle a class that display/remove the notification dropdown
      // set the ariaExpanded of the alert button based on if the class is present or not
      alertContent.classList.toggle('notification-active');
      alertTrigger.ariaExpanded = alertContent.classList.contains('notification-active') ? 'true' : 'false';
    };
  
    alertTrigger.addEventListener('click', toggleAlertContent); // add an event listener to listen to the changes
  
    /// STORE-MENU FUNCTIONALITY ///
// When a user clicks on the name of my store Davii Collections, 
// or on my profile image placeholder DC on the far right of the topbar menu, 
// I see a menu with a list of menu items as specified by the Figma design. 
// Clicking on this button again closes the menu. 
// Finally, when I click on any of the menu items in this menu, I am redirected toadmin.shopify.com.
    const storeMenuTrigger = document.querySelector('#storeMenu'); //get the storemenu button
    const storeMenuDropdown = document.querySelector('.store-menu-dropdown'); //get the storemenu dropdown
    const allMenuItems = storeMenuDropdown.querySelectorAll('[role="menuitem"]'); //get all the list in the dropdown
      
    const handleMenuEscapeKeyPress = (e) => {  //function to use escape key to navigate out of storemenu dropdown
      if (e.key === 'Escape') {
        toggleMenu();
      }
    };
  
    const handleMenuEnterKeyPress = (e) => {
      if (e.key === 'Enter') {
        toggleMenu();
      }
    };
  
    storeMenuTrigger.addEventListener('keyup', handleMenuEnterKeyPress); //event that listens to the changes
  
     // User should be able to focus on each list item using keyboard arrows
    const handleMenuItemArrowKeyPress = (e, menuItemIndex) => {
      // get the last list item in the store menu dropdown
      // get the first list element in the store menu dropdown
      //get the next item in the store menu dropdown
      // get the previous item in the store menu dropdown 
      const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
      const isFirstMenuItem = menuItemIndex === 0;
      const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
      const prevMenuItem = allMenuItems.item(menuItemIndex - 1);
      //  Keyboard navigation using Right,left,Up and Down Key.
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
  
    // On Enter Key press, function to navigate to a new link..
    const handleMenuItemEnterKeyPress = (e) => {
      if (e.key === 'Enter') {
        window.open('https://admin.shopify.com', '_blank');
      }
    };
  //  Open the store menu dropdown 
    const openStoreMenu = () => {
      // set the aria Expanded of the menu button to true
      // focus on the first list item once the drop-down opens
      // perform actions using various event listeners
      storeMenuTrigger.ariaExpanded = 'true';
      allMenuItems.item(0).focus();
      storeMenuDropdown.addEventListener('keyup', handleMenuEscapeKeyPress);
  
      allMenuItems.forEach((menuItem, menuItemIndex) => {
        menuItem.addEventListener('keyup', (e) => handleMenuItemArrowKeyPress(e, menuItemIndex));
        menuItem.addEventListener('keyup', (e) => handleMenuItemEnterKeyPress(e));
      });
    };
   
    //close the store menu dropdown
    const closeStoreMenu = () => {
       // set the aria Expanded of the menu button to false
       //remove the class that displays the store menu dropdown
      // return focus back to the storemenu button
      storeMenuTrigger.ariaExpanded = 'false';
      storeMenuDropdown.classList.remove('store-menu-active');
      storeMenuTrigger.focus()
    };
  
    // function to open or close the store menu based on if the aria Expanded is true
    const toggleMenu = () => {
      // get the current boolean value of the storemenu button
      //open or close the storemenu dropdown based on the boolean value
      const isExpanded = storeMenuTrigger.attributes['aria-expanded'].value === 'true';
      storeMenuDropdown.classList.toggle('store-menu-active');
      isExpanded ? closeStoreMenu() : openStoreMenu();
    };

    // Event Listener for Store Menu Trigger Button
    storeMenuTrigger.addEventListener('click', toggleMenu); 
  
    // TRIAL POPUP FUNCTIONALITY
    const trialPopupContainer = document.querySelector('#trialPopup'); //get the trial popup wrapper
    const trialPopup = document.querySelector('#trialPopupContent'); // get the trial pop up content
    const selectPlansButton = document.querySelector('.selectPlanButton'); // get the select plans buttom
    const cancelButton = document.querySelector('.cancelButton'); //get the cance; button
  
    // add an event that opens a new link on click of the select plan button
    selectPlansButton.addEventListener('click', () => {
      window.open('https://shopify.com/pricing', '_blank');
    });
  
    // add an event that closes the trial popup on click of the cancel button
    cancelButton.addEventListener('click', () => {
      trialPopupContainer.classList.add('hide-md','visibility')
      trialPopup.classList.add('popup-removed')
    });
  
    // CHECKBOX FUNCTIONALITY ///
    const HIDDEN_CLASS = 'hidden';  //set a class variable to hide the svg element
    const MARK_AS_DONE_CLASS = 'checkbox-done';
    const checkboxButtons = document.querySelectorAll('#accordion-item-checkbox');
    const accordionItems = document.querySelectorAll('.accordionItem');
    let taskCount = 0;
  
    // Mark a step as done
    // Given a task checkbox is clicked
    // When the user clicks on the checkbox
    // Then the not completed icon should be hidden
    // And the loading spinner icon should be shown
    // And the checkbox button status should indicate loading
    const handleMarkAsDone = (
        checkboxButton, checkboxButtonStatus,
       notCompletedIcon, completedIcon,
        loadingSpinnerIcon, index
        ) => {
      notCompletedIcon.classList.add(HIDDEN_CLASS);
      loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);
      checkboxButtonStatus.ariaLabel = 'Loading, Please wait....';
        //  updates after 2 secs
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
  
      // Mark a step as not done
    // Given a completed task checkbox is clicked
    // When the user clicks on the checkbox
    // Then the completed icon should be hidden
    // And the loading spinner icon should be shown
    // And the checkbox button status should indicate loading
    const handleMarkAsNotDone = (
      checkboxButton, checkboxButtonStatus, 
      notCompletedIcon, completedIcon,
       loadingSpinnerIcon, index
      ) => {
      completedIcon.classList.add(HIDDEN_CLASS);
      loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);
      checkboxButtonStatus.ariaLabel = 'Loading, Please wait....';

          // updates after 2 seconds
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
  
    // Toggle between marking a step as done or not done
    // Given a step checkbox is clicked
    // When the user clicks on the checkbox
    // Then if the checkbox is marked as done
    //   - Mark the step as not done
    // Else
    //   - Mark the step as done
    const handleMarkDoneOrNotDone = (
      checkboxButton, checkboxButtonStatus, 
      notCompletedIcon, completedIcon,
       loadingSpinnerIcon, index
       ) => {
        //checks if the mark as done class is present on the checkbox button
        // toggle between marking a step as done or not based on the class presence
      const markedAsDone = checkboxButton.classList.contains(MARK_AS_DONE_CLASS);
      markedAsDone ? handleMarkAsNotDone(
        checkboxButton, checkboxButtonStatus, 
        notCompletedIcon, completedIcon, 
        loadingSpinnerIcon, index
        ) : handleMarkAsDone(
          checkboxButton, checkboxButtonStatus,
           notCompletedIcon, completedIcon, 
           loadingSpinnerIcon, index);
    };
  
    
    //Update the progress status
    // Given a task count and progress bar
    // When the progress status is updated
    // Then the task count status text should be updated
    // And the progress bar value should be adjusted accordingly
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
        handleMarkDoneOrNotDone(
          checkboxButton, checkboxButtonStatus, 
          notCompletedIcon, completedIcon, 
          loadingSpinnerIcon, index);
      });
    });
  
    

    // ACCORDION FUNCTIONS ///
    // Expand and collapse accordion items
    // Given an accordion item
    // When the user clicks on the accordion header
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

    //   - Expand the accordion item
    //   - Mark the accordion item as open
    //   - Set the ARIA attributes to true
    //   - Focus on the checkbox button in the accordion item
    //   - Enable keyboard navigation within the accordion ite
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
  
   //   Collapse the accordion item
      //  Mark the accordion item as open
      //  Set the ARIA attributes accordingly
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
  
    // Expand the next incomplete step in the accordion
    const expandNextIncompleteStep = (index) => {
        // Close the current accordion
      closeCurrentAccordion();
        // Find the next incomplete task and expand its accordion item
      Array.from(checkboxButtons).some((checkboxButton, idx) => {
        if (checkboxButton.ariaPressed === 'false') {
          const accordionItem = accordionItems[idx];
  
          if (accordionItem) {
             // Access elements within the accordion item
            const image = accordionItem.querySelector('img');
            const link = accordionItem.querySelector('a');
            const accordionButton = accordionItem.querySelector('.accordionButton');
            const accordionButtonTwo = accordionItem.querySelector('.accordionButton-two');
            // Expands the accordion item
            accordionItem.classList.add('open');
            accordionItem.ariaExpanded = 'true';
            image.classList.remove('hidden');
            link.tabIndex = 0;
            accordionButton.tabIndex = 0;
           // Handles the case where there's a second button
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
  