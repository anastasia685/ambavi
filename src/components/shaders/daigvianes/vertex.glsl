uniform float uTime;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //float elevation = cnoise(vec2(modelPosition.x, 1.0));

    //modelPosition.xy += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}