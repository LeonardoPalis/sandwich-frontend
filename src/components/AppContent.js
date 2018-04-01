import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import MarkdownElement from './MarkdownElement';

const styleSheet = {
  content: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
};

function AppContent(props) {
  const { className, classes, children: childrenProp, route } = props;

  let children = childrenProp;

  if (!children) {
    const text = `
# Summary

${route.childRoutes.map(childRoute => `- [${childRoute.title}](${childRoute.path})`).join('\n')}
`;
    children = <MarkdownElement text={text} />;
  }

  return (
    <div className={classNames(classes.content, className)}>
      {children}
    </div>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  route: PropTypes.object.isRequired,
};

export default withStyles(styleSheet, {name: 'AppContent'})(AppContent);
