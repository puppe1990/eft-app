class EFT {

  static DEFAULT_PHRASES = [
    "Even though I have this [issue], I deeply and completely accept myself.",
    "I am worthy and deserving of feeling [issue].",
    "I am open to feeling [issue] in place of these negative beliefs.",
    "I choose to believe that I am [issue].",
    "I am [issue] and capable of achieving my goals."
  ]

  static CUSTOM_PHRASES = ["Even though I have this [issue], I deeply and completely accept myself.",]

  static tap(issue, feeling, phrases = EFT.DEFAULT_PHRASES, isCustom = false) {
    // Select the phrases to use based on the isCustom flag
    const selectedPhrases = isCustom ? phrases : EFT.DEFAULT_PHRASES;
    // Loop through the selected phrases and perform tapping for each phrase
    for (let i = 0; i < selectedPhrases.length; i++) {
      // Replace the [issue] placeholder in the phrase with the actual issue
      const phrase = selectedPhrases[i].replace('[issue]', issue);
      // Perform the tapping for this phrase
      console.log(`Tapping for: "${phrase}"`);
      // You could also add code here to display the phrase on the screen and/or play audio for the tapping points
    }
    // Once the tapping is complete, check the feeling level again
    console.log(`Feeling level after tapping: ${feeling}`);
  }
  
}