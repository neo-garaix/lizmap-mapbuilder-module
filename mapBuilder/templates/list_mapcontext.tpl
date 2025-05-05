{jmessage}
{if $mcOwnList && $mcOwnCount > 0}
    <div>
        <strong>{@mapBuilder~mapcontext.private@}</strong>
        {foreach $mcOwnList as $mc}
            <div class="element-mapcontext"
                    {if $mc->is_public}
                        style="background: linear-gradient(to right, white 87%, #d6ffd0);"
                    {else}
                        style="background: linear-gradient(to right, white 87%, #ffdbdb);"
                    {/if}
            >
                <p class="element-mapcontext-title">{$mc->name}</p>
                <div class="mapcontext-button">
                    <button class="btn-mapcontext-run" value="{$mc->id}" data-toggle="tooltip"
                            title="{@mapBuilder~mapcontext.mymaps.button.run@}"><i class="fas fa-eye"></i></button>
                    {if $loggedUser}
                        <button class="btn-mapcontext-del" value="{$mc->id}" data-toggle="tooltip"
                                title="{@mapBuilder~mapcontext.mymaps.button.del@}"><i class="fas fa-trash"></i>
                        </button>
                    {/if}
                    <div class="mapcontext-visibility">
                        {if $mc->is_public}
                            <i class="fas fa-lock-open" data-toggle="tooltip"
                               title="{@mapBuilder~mapcontext.map.public@}"></i>
                        {else}
                            <i class="fas fa-lock" data-toggle="tooltip"
                               title="{@mapBuilder~mapcontext.map.private@}"></i>
                        {/if}
                    </div>
                </div>
            </div>
        {/foreach}
    </div>
{/if}
{if $mcSharedList && $mcSharedCount > 0}
    <div>
        {if $loggedUser}<strong>{@mapBuilder~mapcontext.public@}</strong>{/if}
        {foreach $mcSharedList as $mc}
            <div class="element-mapcontext" style="background: linear-gradient(to right, white 87%, #d6ffd0);">
                <p class="element-mapcontext-title">{$mc->name}</p>
                <div class="mapcontext-button"
                     style="min-width: 80px;">
                    <button class="btn-mapcontext-run" value="{$mc->id}" data-toggle="tooltip"
                            title="{@mapBuilder~mapcontext.mymaps.button.run@}"><i class="fas fa-eye"></i></button>
                    <div class="mapcontext-visibility">
                        <i class="fas fa-lock-open" data-toggle="tooltip"
                           title="{@mapBuilder~mapcontext.map.public@}"></i>
                    </div>
                </div>
            </div>
        {/foreach}
    </div>
{/if}
