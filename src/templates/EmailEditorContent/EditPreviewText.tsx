import React, { FC } from 'react'
import { usePreviewText } from '../PreviewText'
import './EditPreviewText.css'
import { VisuallyHidden } from '@reach/visually-hidden'

export const EditPreviewText: FC = () => {
  const id = 'edit-preview-text'
  const [value, setValue] = usePreviewText()

  return (
    <div className="edit-preview-text">
      <div className="edit-preview-text-content">
        <div className="instructions">
          <h2>Preview Text</h2>
          <p id="preview-text-description" className="description">
            1-2 sentences that will preview the content of your email
          </p>
        </div>
        <div className="preview-container">
          <div className="subject-and-preview">
            <p className="subject">[Subject Line] Don't forget this on your platform!</p>
            <VisuallyHidden>
              <label htmlFor={id}>Preview text</label>
            </VisuallyHidden>
            <textarea
              id={id}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="This is the preview text that you can edit. It gives insight into the email so that people will open it."
              aria-describedby="preview-text-description preview-text-character-count"
            />
          </div>
          <div id="preview-text-character-count" className="suggestion-and-count">
            <p>80-120 characters is ideal</p>
            <p>
              {value.length}
              <VisuallyHidden>characters total</VisuallyHidden>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
