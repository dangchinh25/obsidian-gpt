import { Plugin } from 'obsidian';
import { ExampleView, VIEW_TYPE_EXAMPLE } from './src/view';
import {
    SettingsTab, type Settings, DEFAULT_SETTINGS
} from './src/settings';

export default class ObsidianGPT extends Plugin {
    settings: Settings | undefined;

    async onload (): Promise<void> {
        this.registerView(
            VIEW_TYPE_EXAMPLE,
            ( leaf ) => new ExampleView( leaf )
        );

        this.addRibbonIcon( 'message-circle', 'Obsidian GPT', () => {
            console.log( 'Obsidian GPT icon' );

            this.activateView();
        } );

        await this.loadSettings();

        this.addSettingTab( new SettingsTab( this.app, this ) );
    }

    onunload (): void {

    }

    async activateView (): Promise<void> {
        this.app.workspace.detachLeavesOfType( VIEW_TYPE_EXAMPLE );

        await this.app.workspace.getRightLeaf( false ).setViewState( {
            type: VIEW_TYPE_EXAMPLE,
            active: true
        } );

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType( VIEW_TYPE_EXAMPLE )[ 0 ]
        );
    }

    async loadSettings (): Promise<void> {
        this.settings = { ...DEFAULT_SETTINGS,  ...await this.loadData() };
    }

    async saveSettings (): Promise<void> {
        await this.saveData( this.settings );
    }
}