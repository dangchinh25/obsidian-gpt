/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    App, PluginSettingTab, Setting
} from 'obsidian';
import ObsidianGPT from '../../main';

export class SettingsTab extends PluginSettingTab {
    plugin: ObsidianGPT;

    constructor ( app: App, plugin: ObsidianGPT ) {
        super( app, plugin );
        this.plugin = plugin;
    }

    display (): void {
        const { containerEl } = this;

        containerEl.empty();

        if ( this.plugin.settings ) {
            new Setting( containerEl )
                .setName( 'OpenAI API Key' )
                .setDesc( 'Your own OpenAI API Key' )
                .addText( ( text ) =>
                    text
                        .setPlaceholder( '<YOUR_OPENAI_API_KEY>' )
                        .setValue( this.plugin.settings!.openaiKey )
                        .onChange( async ( value ) => {
                            this.plugin.settings!.openaiKey = value;
                            await this.plugin.saveSettings();
                        } ) );

            new Setting( containerEl )
                .setName( 'OpenAI API Model' )
                .setDesc( 'OpenAI API Model' )
                .addText( ( text ) =>
                    text
                        .setValue( this.plugin.settings!.openaiModel )
                        .onChange( async ( value ) => {
                                    this.plugin.settings!.openaiModel = value;
                                    await this.plugin.saveSettings();
                        } ) );
        }
    }
}