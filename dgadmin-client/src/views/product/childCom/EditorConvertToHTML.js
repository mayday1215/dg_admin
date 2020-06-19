import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import PropTypes from "prop-types";


export default class EditorConvertToHTML extends Component {
  static propTypes = {
    detail:PropTypes.string
  }

  constructor(props) {
    super(props);
    const {detail} = this.props
      if (detail){
      const html = detail
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }else{
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }

  }


  onEditorStateChange = (editorState) => {

    this.setState({
      editorState,
    });
  };



  getHtml = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  componentDidMount() {
    this.props.onRef(this)
  }


  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{boxShadow:"0 0 1px rgba(0,0,0,.3)",minHeight:200}}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<textarea*/}
        {/*  disabled*/}
        {/*  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
        {/*/>*/}
      </div>
    );
  }
}
