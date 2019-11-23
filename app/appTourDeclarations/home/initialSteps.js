const initialSteps = [
  {
    intro: `Hi there! <br/>Are you a first time user?<br/><br/> Let me assist you by clicking <i>"Next"</i>.`
  },
  {
    intro: `But first, kindly make sure that you're connected to P&G network, if not, kindly do so.`
  },
  {
    element: ".userFieldBox",
    intro: `To begin, enter one or multiple account tnumber or user id that you would like to check. <br/> ex. <br/><div style="background-color: rgb(61, 173, 228); border-radius: 4px; padding: 3px;">
      <b><span>doe.j</span>
        </br><span>john.d</span></br><span>DI9999</span></b></div>`
  },
  {
    element: ".hubRegionField",
    intro: "Next, select the hub region to check the access of the user with."
  },
  {
    element: ".groupFilterSelectionBox",
    intro:
      "By default all access types available on a hub region are selected, but feel free to select only the access/es that are relevant to you after this tour by selecting the textarea."
  },
  {
    element: ".valSubmitButton",
    intro: `Finally, click <i>"VALIDATE"</i> to start the access validation and wait for the result to finish.`
  }
];

export default initialSteps;