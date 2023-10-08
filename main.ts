import { Plugin } from 'obsidian';
import { ExampleView, VIEW_TYPE_EXAMPLE } from './view';

export default class ObsidianGPT extends Plugin {
    async onload (): Promise<void> {
        this.registerView(
            VIEW_TYPE_EXAMPLE,
            ( leaf ) => new ExampleView( leaf )
        );

        this.addRibbonIcon( 'message-circle', 'Obsidian GPT', () => {
            console.log( 'Obsidian GPT icon' );

            this.activateView();
        } );
    }

    onunload (): void {

    }

    async activateView () {
        this.app.workspace.detachLeavesOfType( VIEW_TYPE_EXAMPLE );

        await this.app.workspace.getRightLeaf( false ).setViewState( {
            type: VIEW_TYPE_EXAMPLE,
            active: true
        } );

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType( VIEW_TYPE_EXAMPLE )[ 0 ]
        );
    }
}