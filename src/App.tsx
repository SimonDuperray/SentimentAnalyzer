import React from "react";
import './App.css';
import emotions from "./base_json.json";
import SecondChart from "./components/SecondChart";

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
    return array.reduce(
      (prev: any, curr) => ({
        ...prev,
        [curr]: 1+(prev[curr] || 0),
      }),
      {}
    );
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
        name: Object.keys(countedData)[i],
        value: Object.values(countedData)[i]
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
    const dataRecharts: any = [
      { name: "Facebook", value: 200000000 },
      { name: "Instagram", value: 140000000 },
      { name: "Twitter", value: 300000000 },
      { name: "TikTok", value: 1000000000 },
   ]
    console.log(this.state);
    return (
      <div className="App-header">
        <form onSubmit={event => this.handleSubmit(event)}>
          <textarea
            placeholder="text to analyze"
            onChange={event => this.setState({ text: event.target.value})}
          />
          <button type="submit">Anayze</button>
        </form>
        {
          this.state.showDiag ? (
            <div>
              <SecondChart
                width={400}
                height={400}
                dataKey="value"
                isAnimationActive={false}
                data={this.state.analyzeResults}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
              />
            </div>
          ) : (
            <div>
              No data stored
            </div>
          )
        }
      </div>
    );
  }
}