/**
 *Name: Juda Fernandez
 *May 6, 2021
 *Section: AM - Fadel
 *Description: The JS file for my random meme generator webpage
 *Provides interactivity by detecting button clicks
 *and making API calls to get randomly generated memes
 */

"use strict"; // "use strict" makes JS stricter when pointing out errors

/**
 * this anonymous function just automatically gets called from the getgo
 * this function essentially "kick starts" the whole JS program
 */
(function() {

  // initiate this JS file only after the DOM has finished and page is fully loaded
  window.addEventListener('load', init);

  // base URL for the meme API
  const BASE_URL = "https://api.imgflip.com/get_memes";

  /**
   * this function gets called immediately after the DOM and
   * stylesheet are ready and window loads. The only pupose of this
   * function is to initialize the steps of the meme generator by
   * adding an event listener to the button that the user will
   * click to generate a new meme
   */
  function init() {
    qs("button").addEventListener('click', makeRequest);
  }

  /**
   * Standard async/await function for fetch calls.
   * Makes a fetch request, validates the status of
   * that request, converts it to JSON, then initializes
   * the processing of that JSON
   */
  async function makeRequest() {
    try {
      let response = await fetch(BASE_URL);
      statusCheck(response);
      let responseJSON = await response.json();
      processData(responseJSON);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Take the API response(as JSON), and display the
   * randomly generated meme to the user
   * @param {JSON} response - the API response in JSON format
   */
  function processData(response) {

    const upperBound = 100;
    let randomMemeIndex = Math.floor(Math.random() * upperBound);
    let memeName = response.data.memes[randomMemeIndex].name;
    let meme = response.data.memes[randomMemeIndex].url;

    let paragraph = document.createElement("p");
    paragraph.textContent = memeName;

    let image = document.createElement("img");
    image.src = meme;
    image.alt = "lol funny meme XD";

    let htmlBody = qs("body");
    htmlBody.appendChild(paragraph);
    htmlBody.appendChild(image);
  }

  /**
   * checks the status of the response
   * this is the function that was given
   * in class
   * @param {Response} response - response given back by the web service
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * Display an error message to the user
   * the error message will last only one second,
   * and then it'll disappear.
   * NOTE: I realize that for the meme generator,
   * there's really no way for the user to give incorrect
   * input since there's just a button click, but I may
   * add more complex interactivity later
   * @param {Error} error
   */
  function handleError(error) {

    let errorMessage = "Sorry, but your input is invalid. Please try again.";
    let errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = errorMessage + error;
    let htmlBody = qs("body");
    htmlBody.appendChild(errorMessageElement);

    const milisecondsOut = 2000;
    //after 2 seconds, remove the error message
    setTimeout(() => {
      htmlBody.removeChild(htmlBody.lastChild);
    }, milisecondsOut);
  }

  /**
   * Takes a specified selector as a param, then gets the
   * html element that has that specific selector as a tag
   * @param {String} selector - selector specified by the caller  of
   * this function
   * @returns {Element} - html element that has the tag specified by the
   * selector param
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();
