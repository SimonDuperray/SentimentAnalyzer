import React from "react";
import './App.css';
import emotions from "./base_json.json";
import PieChartComp from "./components/PieChartComp";

interface IState {
  text: string;
  analyzeResults: Array<Object>;
  showDiag: boolean
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      analyzeResults: [],
      showDiag: false,
    };
  }

  counter(array: Array<string>): Object{
    if(array != []){
      return array.reduce(
        (prev: any, curr) => ({
          ...prev,
          [curr]: 1+(prev[curr] || 0),
        }),
        {}
      ); 
      } else {return [];}
  };

  analyzeSentiment(text: string): void {
    let transformed: string = "";
    transformed = text.toLowerCase();
    let tokenized_words: Array<string> = transformed.split(" ");
    for(var i: number=0; i<tokenized_words.length; i++){
      tokenized_words[i] = tokenized_words[i].normalize("NFD").replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    }
    let stop_words: Array<string> = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself",
      "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself",
      "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these",
      "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do",
      "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while",
      "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before",
      "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again",
      "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each",
      "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than",
      "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
    
    let final_words: Array<string> = [];
    for(var i: number=0; i<tokenized_words.length; i++) {
      if(!stop_words.includes(tokenized_words[i])){
        final_words.push(tokenized_words[i]);
      }
    }
    let emotions_list: Array<string> = [];
    for(let i: number = 0; i<Object.keys(emotions).length; i++){
      let word: string = emotions[i]["word"];
      let emotion: string = emotions[i]["emotion"];
      if(final_words.includes(word)){
        emotions_list.push(emotion);
      }
    }
    let countedData: Object = this.counter(emotions_list);
    let finalCleanedData: Array<Object> = [];
    for(let i: number = 0; i<Object.keys(countedData).length; i++) {
      finalCleanedData.push({
        "emotion": Object.keys(countedData)[i],
        "emotions": Object.values(countedData)[i],
        "fullMark": Object.values(countedData).reduce((a, b) => a+b)
      });
    }
    this.setState({ analyzeResults: finalCleanedData });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.setState({ text: event.target.value });
    this.analyzeSentiment(this.state.text);
    this.setState({ showDiag: true });
  }
  
  render() {
    return (
      <div className="App-header">
        <h1>Sentiment Analyzer</h1>
        <form onSubmit={event => this.handleSubmit(event)}>
          <textarea
            cols={50}
            rows={10}
            placeholder="text to analyze"
            onChange={event => this.setState({ text: event.target.value})}
          />
          <button type="submit">Anayze</button>
        </form>
        {
          this.state.showDiag ? (
            <PieChartComp 
              width={730}
              height={250}
              data={this.state.analyzeResults}
              dataKeyXAxis="emotion"
              dataKeyBar="emotions"
            />
          ) : (
            <div />
          )
        }
      </div>
    );
  }
}