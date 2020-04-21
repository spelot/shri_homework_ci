import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import constants from "../../utils/constants";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header
            className="Container-Header"
            title={{
              text: constants.SITE_NAME,
              modifiers: [["type", "headerTitle"]]
            }}
          />
          <main className="Container-Main">
            Что-то пошло не так. Попробуйте обновить страницу.
          </main>
          <Footer className="Container-Footer" />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
