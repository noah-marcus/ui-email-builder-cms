import React, {
  CSSProperties,
  JSX,
  ReactNode,
  TableHTMLAttributes,
  forwardRef,
  useMemo,
  useState,
} from 'react'
import { Text } from 'slate'
import { RichTextEditor, RichTextElement, RichTextLeaf, RichTextValue } from './RichTextEditor'
import {
  RichTextAdditionalStyles,
  RichTextAdditionalStylesContext,
} from './RichTextEditor/RichText'

export interface RichTextEditableElementProps {
  additionalStyles?: RichTextAdditionalStyles
  className?: string
  element: keyof JSX.IntrinsicElements
  label: string
  onClick?: TableHTMLAttributes<HTMLOrSVGElement>['onClick']
  onFocus?: TableHTMLAttributes<HTMLOrSVGElement>['onFocus']
  onValueChange: (value: RichTextValue) => void
  readOnly?: boolean
  value: RichTextValue
  style?: CSSProperties
}

export const RichTextEditableElement = forwardRef<any, RichTextEditableElementProps>(
  (
    {
      additionalStyles,
      element: Element,
      label,
      onFocus,
      onValueChange,
      value,
      readOnly,
      style,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const memoizedAdditionalStyles = useMemo(() => additionalStyles ?? {}, [])

    if (isFocused) {
      return (
        <Element style={{ ...style, position: 'relative' }} {...props}>
          <RichTextEditor
            additionalStyles={memoizedAdditionalStyles}
            autoFocus
            label={label}
            onValueChange={onValueChange}
            onEditorBlur={() => setIsFocused(false)}
            value={value}
          />
        </Element>
      )
    } else {
      return (
        <RichTextAdditionalStylesContext.Provider value={memoizedAdditionalStyles}>
          <Element
            aria-label={label}
            aria-readonly={readOnly}
            readOnly={readOnly}
            tabIndex={readOnly ? null : 0}
            style={style}
            onFocus={(event) => {
              onFocus && onFocus(event)
              if (!readOnly) {
                setIsFocused(true)
              }
            }}
            {...({ ref } as any)}
            {...props}
          >
            {displayRichText(value)}
          </Element>
        </RichTextAdditionalStylesContext.Provider>
      )
    }
  },
)

const displayRichText = (value: RichTextValue): ReactNode => {
  return value.map((node, i) => {
    if (Text.isText(node)) {
      return (
        <RichTextLeaf key={i} leaf={node}>
          {node.text || <>&nbsp;</>}
        </RichTextLeaf>
      )
    }
    return (
      <RichTextElement key={i} element={node}>
        {displayRichText(node.children)}
      </RichTextElement>
    )
  })
}
