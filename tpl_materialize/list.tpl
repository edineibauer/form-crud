<div class="{$col}">
    <div class="input-field col s12">
        <i class="material-icons prefix">insert_drive_file</i>
        <input type="text" id="{$column}" ng-model="{$ngmodel}" class="{$class} autocomplete">
        <label for="{$column}">{$title}</label>
    </div>
</div>

{*
<div class='box box-2 s11box-1 pd-small {$class}' rel="FK {$title}">
    <label style='width:65%;padding-top:1px; min-height: 30px;' class='fl-left'>
        <input type="text" id="{$column}" ng-model="{$ngmodel}">
        <span class='font-light'>

        </span>
    </label>

    <button class='left btn btn-staticwhite boxshadow font-bold hovershadow-heavy pd-smallb upper transition-easy radius addOneToOne #button_display#' onclick="getPage('#table#', #id#, '#idName#')" >
        #button_title#
    </button>

    <div class='container ps-relative divoptionsOneToOne' rel='#idName#'>
        <div class='container bg-white ps-absolute optionsOneToOne' style='margin-top: -6px;'></div>
    </div>

    <input type='hidden' value='#idValue#' id='#idName#'/>

    <div class='container pd-medium'></div>
</div>*}