import React from "react";
import { BackDrop } from "../components/Backdrop";
import { Dialog } from "../components/Dialog";
import { getComponentName } from "../lib/utils"
import ReactDOM from "react-dom";

export const layoutContext = React.createContext({});
layoutContext.displayName = "layoutContext";

export class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialog: null
    };
    this.setDialog = this.setDialog.bind(this);
  }

  setDialog(dialog) {
    this.setState({dialog});
  }

  render() {
    const value ={
      dialog: this.state.dialog,
      setDialog: this.setDialog
    };

    return (
      <layoutContext.Provider value={value}>
        {this.props.children}
      </layoutContext.Provider>
    )
  }
};

export const withLayout = WrappedComponent => {
  const WithLayout = (props)=> (
    <layoutContext.Consumer>
      {({dialog, setDialog}) => {
        const openDialog = setDialog;

        const closeDialog =() => setDialog(null);

        const startLoading = (message) => openDialog(<Dialog>{message}</Dialog>);

        const finishLoading = closeDialog;

        const enhencedProps = {
          dialog,
          openDialog,
          closeDialog,
          startLoading,
          finishLoading
        }

        return <WrappedComponent {...props} {...enhencedProps} />
      }}
    </layoutContext.Consumer>
  )
  WithLayout.displayName = `WithLayout(${getComponentName(WrappedComponent)})`;
  return WithLayout;
}

export const DialogContainer = withLayout(
  ({dialog})=> dialog && ReactDOM.createPortal(<BackDrop>{dialog}</BackDrop>, document.querySelector('#dialog'))
)