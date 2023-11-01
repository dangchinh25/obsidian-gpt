import { Plugin } from 'obsidian';
import { MainView, VIEW_TYPE } from './src/view';
import {
    SettingsTab, type Settings, DEFAULT_SETTINGS
} from './src/settings';
import OpenAI from 'openai';
import { createOpenAIClient } from './src/services/openai';

export default class ObsidianGPT extends Plugin {
    settings: Settings | undefined;
    openAIClient: OpenAI | null = null;
    static instance: ObsidianGPT | null = null;

    async onload (): Promise<void> {
        ObsidianGPT.instance = this;

        this.registerView(
            VIEW_TYPE,
            ( leaf ) => new MainView( leaf )
        );

        this.addRibbonIcon( 'message-circle', 'Obsidian GPT', () => {
            console.log( 'Obsidian GPT icon' );

            this.activateView();
        } );

        await this.loadSettings();

        this.addSettingTab( new SettingsTab( this.app, this ) );

        if ( this.settings?.openaiKey ) {
            this.openAIClient = createOpenAIClient( this.settings.openaiKey );
        }
    }

    onunload (): void {
        ObsidianGPT.instance = null;
    }

    async activateView (): Promise<void> {
        this.app.workspace.detachLeavesOfType( VIEW_TYPE );

        await this.app.workspace.getRightLeaf( false ).setViewState( {
            type: VIEW_TYPE,
            active: true
        } );

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType( VIEW_TYPE )[ 0 ]
        );
    }

    async loadSettings (): Promise<void> {
        this.settings = { ...DEFAULT_SETTINGS,  ...await this.loadData() };
    }

    async saveSettings (): Promise<void> {
        await this.saveData( this.settings );
    }
}