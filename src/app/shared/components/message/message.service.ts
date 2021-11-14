import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';
import { MessageContainerComponent } from './message-container.component';
import { MessageData, MessageDataFilled, MessageDataOptions } from './message.definitions';

// TODO: remove MessageData generic type as it has no contributon in typing
export class MessageBaseService<ContainerClass extends MessageContainerComponent, MessageData> {
  protected _counter = 0; // Id counter for messages
  protected _container: ContainerClass;

  constructor(overlay: Overlay, containerClass: Type<ContainerClass>, private _idPrefix: string = '') {
    this._container = overlay.create().attach(new ComponentPortal(containerClass)).instance;

  }

  protected defaultOptions: MessageDataOptions = {
    Position: "top-right",
    Style: "circle",
    Duration: 3000
  }

  remove(messageId?: string): void {
    if (messageId) {
      this._container.removeMessage(messageId);
    } else {
      this._container.removeMessageAll();
    }
  }

  createMessage(message: object, options?: MessageDataOptions): MessageDataFilled {
    options = (options) ? {...this.defaultOptions, ...options} : this.defaultOptions

    // TODO: spread on literal has been disallow on latest proposal
    const resultMessage: MessageDataFilled = {
      ...message, ...{
        messageId: this._generateMessageId(),
        options,
        createdAt: new Date()
      }
    };
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  protected _generateMessageId(): string {
    return this._idPrefix + this._counter++;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService extends MessageBaseService<MessageContainerComponent, MessageData> {

  constructor(overlay: Overlay) {
    super(overlay, MessageContainerComponent, 'message-');
  }

  // Shortcut methods
  success(content: string, options?: MessageDataOptions): MessageDataFilled {
    this.defaultOptions.imgURL = "../../../../assets/img/notifications/check-mark.png";
    this.defaultOptions.Title = "Success",
    this.defaultOptions.Animate = true;
    return this.createMessage({ type: 'success', content }, options);
  }

  error(content: string, options?: MessageDataOptions): MessageDataFilled {
    this.defaultOptions.imgURL = "../../../../assets/img/notifications/x-mark.png";
    this.defaultOptions.Title = "Error";
    this.defaultOptions.Animate = true;
    return this.createMessage({ type: 'error', content }, options);
  }

  info(content: string, options?: MessageDataOptions): MessageDataFilled {
    ``
    return this.createMessage({ type: 'info', content }, options);
  }

  warning(content: string, options?: MessageDataOptions): MessageDataFilled {
    return this.createMessage({ type: 'warning', content }, options);
  }

  create(type: string, content: string, options?: MessageDataOptions): MessageDataFilled {
    return this.createMessage({ type, content }, options);
  }
}
