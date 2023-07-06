import './message.scss';
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import BaseChatTemplate  from '../baseChatTemplate';
import KoreHelpers from '../../../../utils/helpers';
import IconsManager from '../../../base/iconsManager';

export function Message(props: any) {
    const msgData = props.msgData;
    const hostInstance = props.hostInstance;
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });
    const helpers = KoreHelpers.helpers;
    const cbStyle: any = {
        rounded: 'bot-bubble-content',
        balloon: 'bot-bubble-content chat-bubble-style-1',
        rectange: 'bot-bubble-content chat-bubble-style-2'
    }

    if (msgData.message) {
        return (
            <Fragment>
                {
                    msgData.message.map((msgItem: any) => {
                        if (msgItem.cInfo && msgItem.type === 'text') {
                            return (
                                msgData.type === 'bot_response' ? (
                                    msgItem.component && msgItem.component.type === 'error' ? ('') : (<div className="bot-bubble-comp" id={msgData.messageId}>
                                        <div className={cbStyle[brandingInfo.body.bubble_style]}>
                                            <div className="top-info">
                                                <div className="you-text">Kore.ai Bot</div>
                                                { brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && <div className="time-tamp">
                                                    <time>{helpers.formatDate(msgData.createdOn)}</time>
                                                </div> }
                                            </div>
                                            <div className="bubble-msg-with-img">
                                                <div className="bubble-msg" style={{ background: brandingInfo.body.bot_message.bg_color, color: brandingInfo.body.bot_message.color }}>{msgItem.cInfo.body}</div>
                                                <div className="bot-img">
                                                    <figure>
                                                        <img src={iconHelper.getIcon('avatar_bot')} alt='avatr img' />
                                                    </figure>
                                                </div>
                                                <div className="copy-bubble">
                                                    <img src="/images/arrow-back.svg" alt="back button" />
                                                </div>
                                            </div>
                                            { brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && <div className="bottom-info">
                                                <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                                            </div> }
                                        </div>
                                    </div>)) : (
                                    <div className="agent-bubble-comp" id={msgData.messageId}>
                                        <div className="agent-bubble-content">
                                            <div className="top-info">
                                                    { brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'top' && <div className="time-tamp">
                                                        <time>{helpers.formatDate(msgData.createdOn)}</time>
                                                    </div> }
                                                <div className="you-text">You</div>
                                            </div>
                                            <div className="bubble-msg-with-img">
                                                <div className="bubble-msg" style={{ background: brandingInfo.body.user_message.bg_color, color: brandingInfo.body.user_message.color }}>{msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== '' ? msgItem.cInfo.renderMsg : msgItem.cInfo.body}
                                                </div>
                                                <div className="agent-img">
                                                    <figure>
                                                        <img src="/images/avatar-bot.svg" alt='avatr img' />
                                                    </figure>
                                                </div>
                                                <div className="copy-bubble">
                                                    <img src="/images/arrow-back.svg" alt="back button" />
                                                </div>
                                            </div>
                                                { brandingInfo.body.time_stamp.show && brandingInfo.body.time_stamp.position == 'bottom' && <div className="bottom-info">
                                                    <div className="time-tamp"><time>{helpers.formatDate(msgData.createdOn)}</time></div>
                                                    {/* <div className="read-text">Read <i className="sdkv3-read-status"></i></div> */}
                                                </div> }
                                        </div>
                                    </div>)
                            )
                        }
                    })
                }
            </Fragment>
        )
    }
}

class MessageTemplate extends BaseChatTemplate {
    hostInstance: any = this;

    renderMessage(msgData: any) {
        return this.getHTMLFromPreact(Message, msgData, this.hostInstance);
    }

}

export default MessageTemplate;