varying float vDistance;
varying vec2 vUv;

uniform sampler2D uTexture;
void main(){
    //purple
    //vec3 accentColor = vec3(0.4, 0.01, 0.65);

    vec3 accentColor = vec3(0.27, 0.39, 0.95);
    vec3 mainColor = vec3(0.0, 0.01, 0.65);
    /**vec3 accentColor = vec3(0.0);
    vec3 mainColor = vec3(1.0);*/

    //float strength = smoothstep(0.2, 0.4, vDistance * 0.5);
    float strength = smoothstep(0.2, 0.9, vDistance * 4.0);
    //float strength = step(0.1, 1.0 - vDistance);
    vec3 mixedColor = mix(mainColor, accentColor, strength);

    /*gl_FragColor = vec4(vec3((vDistance - 0.8)*1.4), 1.0);*/
    gl_FragColor = vec4(mixedColor, 1.0);
    //gl_FragColor = vec4(mixedColor, 1.0) * texture2D( uTexture, vUv );

    //gl_FragColor = vec4(vec3(0.0, 0.01, 0.65), 1.0);
}