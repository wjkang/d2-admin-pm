import { Message, MessageBox, Notification } from 'element-ui';
export default function (config) {
    if (config && config.success) {
        if (config.success.type === 'message') {
            Message(config.success.options)
        } else if (config.success.type === 'messagebox') {
            MessageBox(config.success.options)
        } else if (config.success.type === 'notification') {
            Notification(config.success.options)
        }
    }
}