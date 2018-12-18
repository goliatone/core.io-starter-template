'use strict';

module.exports = {
    port: process.env.NODE_APP_PORT || 7331,
    dependencies: [
        {%- if dependents.server -%}
        {% for dep in dependents.server -%}'%{dep}%',{%- endfor %}
        {%- endif -%}
    ]
};