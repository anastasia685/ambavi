varying vec3 vColor;
varying float vAlpha;
varying float vRotation;

/*uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;*/

uniform sampler2D uTexture;
uniform float uTime;

void main()
{
    //START PATTERN
    //float strength = 0.02 / distance(vUv, vec2(0.5));



    /*float depth = gl_FragCoord.z / gl_FragCoord.w;


    vec2 screen = vec2(1000.0, 500.0);
    vec2 st = gl_FragCoord.xy / screen.xy;*/


    vec2 rotated = vec2(cos(vRotation + uTime * 18.0) * (gl_PointCoord.x - 0.5) + 0.5, sin(vRotation + uTime * 18.0) * (gl_PointCoord.y - 0.5) + 0.5);

    gl_FragColor = vec4( vColor, vAlpha );
    gl_FragColor = gl_FragColor * texture2D( uTexture, gl_PointCoord );



    /*#ifdef USE_FOG
    #ifdef USE_LOGDEPTHBUF_EXT
    float depth = gl_FragDepthEXT / gl_FragCoord.w;
    #else
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    #endif
    float fogFactor = smoothstep( fogNear, fogFar, depth );
    gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
    #endif*/
}