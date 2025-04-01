import { IEvents } from "../../types";
import { Modal } from "../view/common/Modal";
import { PageLayout } from "../view/PageLayout";

export default class ModalPresenter {
  constructor(
    private modal: Modal,
    private pageLayout: PageLayout,
    private events: IEvents
  ) {
    this.initialize();
  }

  private initialize() {
    // Обработка открытия модалки с контентом
    this.events.on('modal:open', (data: { content: HTMLElement }) => {
      this.modal.content = data.content;
      this.modal.open();
      this.pageLayout.locked = true;
    });

    // Обработка закрытия модалки
    this.events.on('modal:close', () => {
      this.modal.close();
      this.pageLayout.locked = false;
    });
  }
}