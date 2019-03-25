import React, { createRef, RefObject } from 'react';
import Store, { ModelState } from './../components/Store';
import Theme, { Styles } from './../components/Theme';
import { Layout } from './styles';
import Editor from './../components/Container';
import Canvas from './../components/Canvas';
import Sidebar from './../components/Sidebar';
import { DragLayer } from './../components/Draggable';

export class Application extends React.Component<Props> {
  store: RefObject<Store> = createRef();

  render() {
    return (
      <Store ref={this.store} initialState={this.props.state}>
        <Theme styles={this.props.styles}>
          <DragLayer>
            <Layout className="apollon-editor">
              <Editor>
                <Canvas />
              </Editor>
              <Sidebar />
            </Layout>
          </DragLayer>
        </Theme>
      </Store>
    );
  }
}

interface Props {
  state: ModelState | null;
  styles: Partial<Styles>;
}

export default Application;
