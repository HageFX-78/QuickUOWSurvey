// ==UserScript==
// @name         UOWKDU Teaching Survey Quick Selector
// @namespace    https://github.com/HageFX-78
// @version      0.1.1
// @description  As the name implies, this scripts helps to quick select (basically skip) all radio boxes in UOWKDU teaching survey with option to randomize as well.
// @author       HageFX78
// @license      MIT
// @match        https://survey.uowmkdu.edu.my/survey.aspx
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL  https://github.com/HageFX-78/QuickUOWSurvey/blob/main/surveyQuickSelect.js
// @updateURL    https://github.com/HageFX-78/QuickUOWSurvey/blob/main/surveyQuickSelect.js
// ==/UserScript==

GM_addStyle(`
    #cheeseContainer{
        display: flex;
        align-items: stretch;
        padding: 10px 10px 10px 10px;
        margin-top: 6em;
        background: #222831;
    }
    .cheeseText{
        font-size: 14px;
        color: white;
        padding: 5px;
    }
    .cheeseBtn {
        padding: 5px 10px 5px 10px;
        color: #EEEEEE;
        background-color: #00ADB5;
        margin: 0 10px 0 10px;
        border-style: none;
        border-radius: 2px;
        font-size: 14px;
        box-shadow: 1px 3px 10px #393E46;
    }
    .cheeseBtn:hover{
        color: #393E46;
        background-color: #EEEEEE;
        cursor: pointer;
        box-shadow: -1px -3px 10px #393E46;
    }

    .cheeseBox{
        width: 40px;
        padding: 5px;
        box-sizing: border-box;
        margin: 0 10px;
        background-color: #EEEEEE;
        font-size: 14px;
    }
    #secSplit{
        margin-left: 5em;
    }
` );
window.addEventListener('load', function () {
    'use strict';

    function addRatingButtons(afterEle) {
        let btnContainer = document.createElement('div');
        btnContainer.id = "cheeseContainer";
        afterEle.parentNode.insertBefore(btnContainer, afterEle.nextSibling);

        let allBR = document.getElementsByTagName('br');
        allBR[12].remove();//Site has 3 break points <br> between survey divs, makes it look really ugly honestly
        allBR[12].remove();
        allBR[12].remove();

        let rateText = document.createElement('span');
        let btnR1 = document.createElement('span');
        let btnR2 = document.createElement('span');
        let btnR3 = document.createElement('span');
        let btnR4 = document.createElement('span');
        let btnR5 = document.createElement('span');
        let btnR6 = document.createElement('span');
        let btnClear = document.createElement('span');

        rateText.innerHTML = "Rate All As: ";
        btnR1.innerHTML = " 1 ";
        btnR2.innerHTML = " 2 ";
        btnR3.innerHTML = " 3 ";
        btnR4.innerHTML = " 4 ";
        btnR5.innerHTML = " 5 ";
        btnR6.innerHTML = " N ";
        btnClear.innerHTML = " Clear ";

        btnR1.className = "cheeseBtn";
        btnR2.className = "cheeseBtn";
        btnR3.className = "cheeseBtn";
        btnR4.className = "cheeseBtn";
        btnR5.className = "cheeseBtn";
        btnR6.className = "cheeseBtn";
        btnClear.className = "cheeseBtn";
        rateText.className = "cheeseText";

        btnClear.id = "cheeseClear";

        btnR1.onclick = () => { selectOptions(0); }
        btnR2.onclick = () => { selectOptions(1); }
        btnR3.onclick = () => { selectOptions(2); }
        btnR4.onclick = () => { selectOptions(3); }
        btnR5.onclick = () => { selectOptions(4); }
        btnR6.onclick = () => { selectOptions(5); }
        btnClear.onclick = () => {
            for (let x = 0; x < radTags.length; x++) {
                radTags[x].checked = false;
            }
        }

        btnContainer.appendChild(rateText);
        btnContainer.appendChild(btnR1);
        btnContainer.appendChild(btnR2);
        btnContainer.appendChild(btnR3);
        btnContainer.appendChild(btnR4);
        btnContainer.appendChild(btnR5);
        btnContainer.appendChild(btnR6);
        btnContainer.appendChild(btnClear);

        addRangeSection(btnContainer);

    }

    function selectOptions(sel) {
        for (let x = sel; x < radTags.length; x += 6) {
            radTags[x].checked = true;
            console.log("Checked" + x);
        }
    }
    function addRangeSection(afterEle) {
        let rangeText = document.createElement('span');
        let dashText = document.createElement('span');
        let minBox = document.createElement("INPUT");
        let maxBox = document.createElement("INPUT");
        let btnRand = document.createElement('span');

        minBox.setAttribute("type", "number");
        minBox.setAttribute("min", "1");
        minBox.setAttribute("max", "6");
        maxBox.setAttribute("type", "number");
        maxBox.setAttribute("min", "1");
        maxBox.setAttribute("max", "6");

        rangeText.innerHTML = "Range to randomize :";
        dashText.innerHTML = " - ";
        btnRand.innerHTML = "Randomize!";

        minBox.className = 'cheeseBox';
        maxBox.className = 'cheeseBox';
        rangeText.className = 'cheeseText';
        rangeText.id = 'secSplit';
        dashText.className = 'cheeseText';
        btnRand.className = 'cheeseBtn';

        btnRand.onclick = () => {
            selectRandomRange(parseInt(minBox.value, 10), parseInt(maxBox.value, 10));
            //alert(minBox.value + " and " + maxBox.value);
        }

        minBox.addEventListener('input', function (event) {
            const value = event.target.value;
            const intValue = parseInt(value, 10);

            if (isNaN(intValue) || intValue < 1 || intValue > 6) {
                // If the input is not a number between 1 and 5, clear the input value
                event.target.value = '';
            }
        });
        maxBox.addEventListener('input', function (event) {
            const value = event.target.value;
            const intValue = parseInt(value, 10);

            if (isNaN(intValue) || intValue < 1 || intValue > 6) {
                // If the input is not a number between 1 and 5, clear the input value
                event.target.value = '';
            }
        });

        afterEle.appendChild(rangeText);
        afterEle.appendChild(minBox);
        afterEle.appendChild(dashText);
        afterEle.appendChild(maxBox);
        afterEle.appendChild(btnRand);

    }
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function selectRandomRange(min, max) {
        if (min > max) {
            alert("Min range could not be bigger than max!");
            return;
        }
        for (let x = 0; x < radTags.length; x += 6) {

            radTags[x + getRndInteger(min, max) - 1].checked = true;
        }

    }
    let radTags = document.querySelectorAll('input[type=radio]');
    let spanToAppend = document.getElementById('CPH_main_lblInstruction4');

    addRatingButtons(spanToAppend);
});