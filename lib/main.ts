import { UIMessage } from '@messages/sender'

mg.showUI(__html__, {
  width: 300,
  height: 400
})

mg.ui.onmessage = (msg: { type: UIMessage, data: any }) => {
  const { type, data } = msg
  if (type === UIMessage.HELLO) {
    const textNode = mg.createText()
    textNode.characters = data
  }
}