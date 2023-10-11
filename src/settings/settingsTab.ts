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
                .setName( 'Date format' )
                .setDesc( 'Default date format' )
                .addText( ( text ) =>
                    text
                        .setPlaceholder( 'MMMM dd, yyyy' )
                        .setValue( this.plugin.settings!.dateFormat )
                        .onChange( async ( value ) => {
                            this.plugin.settings!.dateFormat = value;
                            await this.plugin.saveSettings();
                        } ) );
        }
    }
}