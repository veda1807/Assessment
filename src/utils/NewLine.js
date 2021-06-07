// Author : Sreevidya

// This code is used to split the line and display lines in a paragraph tag. 
function NewLine(props) {
  const text = props.text;
  const newText = text.split('\n').map(str => <p>{str}</p>)
  return newText;
}

export default NewLine;
