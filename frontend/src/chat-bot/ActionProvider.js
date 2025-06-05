class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      (<div><p>Перейдите к <a style={{color:'#98E9FF'}} href="/search">ПОИСКУ</a> чтобы выбрать дом</p></div>),
      {
        widget: "learningOptions",
      }
    );

    this.updateChatbotState(message);
  };

  map = () => {
    const message = this.createChatBotMessage(
      "Наш адрес: г.Бирюзовск, ул. Янтарный Овраг, д. 5"
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;