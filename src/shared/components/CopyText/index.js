import React, { Component } from 'react';
import classNames from 'classnames';

import copyText from 'src/helpers/copyText';

import styles from './styles.less';

const checkIcon = 'icon-check-circle';
const copyIcon = 'icon-copy';

class CopyText extends Component {
  state = {
    img: copyIcon,
    className: styles.copied,
  };

  handleCopy = () => {
    copyText(this.props.text);

    this.setState({
      img: checkIcon,
      className: classNames(styles.copied, styles.show),
    });

    setTimeout(() => {
      this.setState({
        img: copyIcon,
        className: styles.copied,
      });
    }, 500);
  };

  render() {
    return (
      <span className={styles.container}>
        <span
          onClick={this.handleCopy}
          className={classNames(this.state.img,this.props.class)}
        />
        <p className={this.state.className}>Copied!</p>
      </span>
    );
  }
}

export default CopyText;
