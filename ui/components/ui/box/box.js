import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  ALIGN_ITEMS,
  BLOCK_SIZES,
  BORDER_STYLE,
  COLORS,
  DISPLAY,
  JUSTIFY_CONTENT,
  SIZES,
  TEXT_ALIGN,
  FLEX_DIRECTION,
  FLEX_WRAP,
  BREAKPOINTS,
} from '../../../helpers/constants/design-system';

const Sizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const BackgroundColors = [
  COLORS.BACKGROUND_DEFAULT,
  COLORS.BACKGROUND_ALTERNATIVE,
  COLORS.OVERLAY_DEFAULT,
  COLORS.PRIMARY_DEFAULT,
  COLORS.PRIMARY_ALTERNATIVE,
  COLORS.PRIMARY_MUTED,
  COLORS.PRIMARY_DISABLED,
  COLORS.SECONDARY_DEFAULT,
  COLORS.SECONDARY_ALTERNATIVE,
  COLORS.SECONDARY_MUTED,
  COLORS.SECONDARY_DISABLED,
  COLORS.ERROR_DEFAULT,
  COLORS.ERROR_ALTERNATIVE,
  COLORS.ERROR_MUTED,
  COLORS.ERROR_DISABLED,
  COLORS.WARNING_DEFAULT,
  COLORS.WARNING_ALTERNATIVE,
  COLORS.WARNING_MUTED,
  COLORS.WARNING_DISABLED,
  COLORS.SUCCESS_DEFAULT,
  COLORS.SUCCESS_ALTERNATIVE,
  COLORS.SUCCESS_MUTED,
  COLORS.SUCCESS_DISABLED,
  COLORS.INFO_DEFAULT,
  COLORS.INFO_ALTERNATIVE,
  COLORS.INFO_MUTED,
  COLORS.INFO_DISABLED,
  COLORS.MAINNET,
  COLORS.ROPSTEN,
  COLORS.KOVAN,
  COLORS.RINKEBY,
  COLORS.GOERLI,
  COLORS.TRANSPARENT,
  COLORS.LOCALHOST,
];
export const BorderColors = [
  COLORS.BORDER_DEFAULT,
  COLORS.BORDER_MUTED,
  COLORS.PRIMARY_DEFAULT,
  COLORS.PRIMARY_ALTERNATIVE,
  COLORS.PRIMARY_MUTED,
  COLORS.PRIMARY_DISABLED,
  COLORS.SECONDARY_DEFAULT,
  COLORS.SECONDARY_ALTERNATIVE,
  COLORS.SECONDARY_MUTED,
  COLORS.SECONDARY_DISABLED,
  COLORS.ERROR_DEFAULT,
  COLORS.ERROR_ALTERNATIVE,
  COLORS.ERROR_MUTED,
  COLORS.ERROR_DISABLED,
  COLORS.WARNING_DEFAULT,
  COLORS.WARNING_ALTERNATIVE,
  COLORS.WARNING_MUTED,
  COLORS.WARNING_DISABLED,
  COLORS.SUCCESS_DEFAULT,
  COLORS.SUCCESS_ALTERNATIVE,
  COLORS.SUCCESS_MUTED,
  COLORS.SUCCESS_DISABLED,
  COLORS.INFO_DEFAULT,
  COLORS.INFO_ALTERNATIVE,
  COLORS.INFO_MUTED,
  COLORS.INFO_DISABLED,
  COLORS.MAINNET,
  COLORS.ROPSTEN,
  COLORS.KOVAN,
  COLORS.RINKEBY,
  COLORS.GOERLI,
  COLORS.TRANSPARENT,
  COLORS.LOCALHOST,
];

const ValidSize = PropTypes.oneOf(Sizes);
const ValidSizeAndAuto = PropTypes.oneOf([...Sizes, 'auto']);
const ValidBackgroundColors = PropTypes.oneOf(BackgroundColors);
const ValidBorderColors = PropTypes.oneOf(BorderColors);

const ArrayOfValidSizes = PropTypes.arrayOf(ValidSize);
export const MultipleSizes = PropTypes.oneOfType([
  ValidSize,
  ArrayOfValidSizes,
]);

const ArrayOfValidSizesAndAuto = PropTypes.arrayOf(ValidSizeAndAuto);
export const MultipleSizesAndAuto = PropTypes.oneOfType([
  ValidSizeAndAuto,
  ArrayOfValidSizesAndAuto,
]);

const ArrayOfValidBorderColors = PropTypes.arrayOf(ValidBorderColors);
export const MultipleBorderColors = PropTypes.oneOfType([
  ValidBorderColors,
  ArrayOfValidBorderColors,
]);

const ArrayOfValidBackgroundColors = PropTypes.arrayOf(ValidBackgroundColors);
export const MultipleBackgroundColors = PropTypes.oneOfType([
  ValidBackgroundColors,
  ArrayOfValidBackgroundColors,
]);

function isValidSize(type, value) {
  // Only margin types allow 'auto'
  return (
    typeof value === 'number' ||
    ((type === 'margin' ||
      type === 'margin-top' ||
      type === 'margin-right' ||
      type === 'margin-bottom' ||
      type === 'margin-left') &&
      value === 'auto')
  );
}

function isValidString(type, value) {
  return typeof type === 'string' && typeof value === 'string';
}

/**
 * Generates classnames for different utility styles from utility props such as margin, padding, display, etc.
 * Accepts numbers and strings for static values and arrays for responsive values.
 * Maps responsive props to mobile first breakpoints
 * Returns an object for 'classnames' package to generate the utility classNames
 *
 * @param {string} baseClass - The root or base class name
 * @param {string} type - The style declaration type "margin", "margin-top", "padding", "display" etc
 * @param {array || number || string} value - prop value being passed in array props are responsive props
 * @param {*} validatorFn - The validation function for each value type
 * @returns
 */

function generateClassNames(baseClass, type, value, validatorFn) {
  // if value does not exist return null
  if (!value) {
    return null;
  }
  // initiate classObject to be returned to classnames package
  let classesObject = {};
  // check if prop is not an array prop
  let singleDigit = Array.isArray(value) ? undefined : value;
  // check if single digit exists or if array has only one item
  if (singleDigit || value.length === 1) {
    // if it is an array with only one item assign it to singleDigit
    if (value.length === 1) {
      singleDigit = value[0];
    }
    // add base style without any className breakpoint prefixes to classObject
    classesObject = {
      ...classesObject,
      [`${baseClass}--${type}-${singleDigit}`]: validatorFn
        ? validatorFn(type, singleDigit)
        : true,
    };
  } else {
    // for array prop with more than one item
    for (let i = 0; i < value.length; i++) {
      // omit any null values to skip breakpoints
      if (value[i] !== null) {
        // first value is always the base value so don't apply any breakpoint prefixes
        if (i === 0) {
          classesObject = {
            ...classesObject,
            [`${baseClass}--${type}-${value[i]}`]: validatorFn
              ? validatorFn(type, value[i])
              : true,
          };
        } else {
          // apply breakpoint prefixes according to index in array [base(no prefix), sm:, md:, lg:]
          classesObject = {
            ...classesObject,
            [`${baseClass}--${BREAKPOINTS[i]}:${type}-${value[i]}`]: validatorFn
              ? validatorFn(type, value[i])
              : true,
          };
        }
      }
    }
  }
  return classesObject;
}

export default function Box({
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  borderColor,
  borderWidth,
  borderRadius,
  borderStyle,
  alignItems,
  justifyContent,
  textAlign,
  flexDirection = FLEX_DIRECTION.ROW,
  flexWrap,
  gap,
  display,
  width,
  height,
  children,
  className,
  backgroundColor,
}) {
  const boxClassName = classnames(
    'box',
    className,
    // Margin
    margin && generateClassNames('box', 'margin', margin, isValidSize),
    marginTop &&
      generateClassNames('box', 'margin-top', marginTop, isValidSize),
    marginRight &&
      generateClassNames('box', 'margin-right', marginRight, isValidSize),
    marginBottom &&
      generateClassNames('box', 'margin-bottom', marginBottom, isValidSize),
    marginLeft &&
      generateClassNames('box', 'margin-left', marginLeft, isValidSize),
    // Padding
    padding && generateClassNames('box', 'padding', padding, isValidSize),
    paddingTop &&
      generateClassNames('box', 'padding-top', paddingTop, isValidSize),
    paddingRight &&
      generateClassNames('box', 'padding-right', paddingRight, isValidSize),
    paddingBottom &&
      generateClassNames('box', 'padding-bottom', paddingBottom, isValidSize),
    paddingLeft &&
      generateClassNames('box', 'padding-left', paddingLeft, isValidSize),
    display && generateClassNames('box', 'display', display, isValidString),
    gap && generateClassNames('box', 'gap', gap, isValidSize),
    flexDirection &&
      generateClassNames('box', 'flex-direction', flexDirection, isValidString),
    flexWrap && generateClassNames('box', 'flex-wrap', flexWrap, isValidString),
    justifyContent &&
      generateClassNames(
        'box',
        'justify-content',
        justifyContent,
        isValidString,
      ),
    alignItems &&
      generateClassNames('box', 'align-items', alignItems, isValidString),
    textAlign &&
      generateClassNames('box', 'text-align', textAlign, isValidString),
    width && generateClassNames('box', 'width', width, isValidString),
    height && generateClassNames('box', 'height', height, isValidString),
    backgroundColor &&
      generateClassNames(
        'box',
        'background-color',
        backgroundColor,
        isValidString,
      ),
    borderRadius &&
      generateClassNames('box', 'rounded', borderRadius, isValidString),
    borderStyle &&
      generateClassNames('box', 'border-style', borderStyle, isValidString),
    borderColor &&
      generateClassNames('box', 'border-color', borderColor, isValidString),
    borderWidth &&
      generateClassNames('box', 'border-width', borderWidth, isValidSize),
    {
      // Auto applied classes
      // ---Borders---
      // if borderWidth or borderColor is supplied w/o style, default to solid
      'box--border-style-solid':
        !borderStyle && (Boolean(borderWidth) || Boolean(borderColor)),
      // if borderColor supplied w/o width, default to 1
      'box--border-width-1': !borderWidth && Boolean(borderColor),
      // ---Flex/Grid alignment---
      // if justifyContent or alignItems supplied w/o display, default to flex
      'box--display-flex':
        !display && (Boolean(justifyContent) || Boolean(alignItems)),
    },
  );
  // Apply Box styles to any other component using function pattern
  if (typeof children === 'function') {
    return children(boxClassName);
  }
  return <div className={boxClassName}>{children}</div>;
}

Box.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  flexDirection: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(FLEX_DIRECTION)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(FLEX_DIRECTION))),
  ]),
  flexWrap: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(FLEX_WRAP)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(FLEX_WRAP))),
  ]),
  gap: MultipleSizes,
  margin: MultipleSizesAndAuto,
  marginTop: MultipleSizesAndAuto,
  marginBottom: MultipleSizesAndAuto,
  marginRight: MultipleSizesAndAuto,
  marginLeft: MultipleSizesAndAuto,
  padding: MultipleSizes,
  paddingTop: MultipleSizes,
  paddingBottom: MultipleSizes,
  paddingRight: MultipleSizes,
  paddingLeft: MultipleSizes,
  borderColor: MultipleBorderColors,
  borderWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  borderRadius: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(SIZES)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(SIZES))),
  ]),
  borderStyle: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BORDER_STYLE)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(BORDER_STYLE))),
  ]),
  alignItems: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(ALIGN_ITEMS)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(ALIGN_ITEMS))),
  ]),
  justifyContent: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(JUSTIFY_CONTENT)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(JUSTIFY_CONTENT))),
  ]),
  textAlign: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXT_ALIGN)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(TEXT_ALIGN))),
  ]),
  display: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(DISPLAY)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(DISPLAY))),
  ]),
  width: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BLOCK_SIZES)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(BLOCK_SIZES))),
  ]),
  height: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(BLOCK_SIZES)),
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(BLOCK_SIZES))),
  ]),
  backgroundColor: MultipleBackgroundColors,
  className: PropTypes.string,
};
