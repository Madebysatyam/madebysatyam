import {
  convertMarkdownToLexical,
  editorConfigFactory,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import type { SanitizedConfig } from 'payload'

import { notesBodyEditor } from '../fields/notesBody'

/**
 * Build Lexical JSON the admin editor can actually parse
 * (hand-built JSON often fails silently and shows an empty editor).
 */
export async function markdownToNoteBody(
  config: SanitizedConfig,
  markdown: string,
): Promise<DefaultTypedEditorState> {
  const editorConfig = await editorConfigFactory.fromEditor({
    config,
    editor: notesBodyEditor,
  })

  return convertMarkdownToLexical({
    editorConfig,
    markdown,
  })
}

export async function emptyNoteBody(config: SanitizedConfig): Promise<DefaultTypedEditorState> {
  return markdownToNoteBody(config, '')
}
