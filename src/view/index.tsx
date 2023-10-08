import { ItemView, WorkspaceLeaf } from 'obsidian';
import ReactView from './ReactView';
import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import { AppContext } from './context';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
  root: Root | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText(): string {
    return 'Example view';
  }

  async onOpen(): Promise<void> {
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <AppContext.Provider value={this.app}>
        <ReactView />
      </AppContext.Provider>
    );
  }

  async onClose(): Promise<void> {
    this.root?.unmount();
  }
}
