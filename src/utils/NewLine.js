// Author:Sreeevidya

// This code is used to split the lines and display them in a paragraph tag
function NewLine(props) {
  const text = props.text;
  const newText = text.split('\n').map((str, i) => <div key={i}>{str}</div>)
  return newText;
}

export default NewLine;
