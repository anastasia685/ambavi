varying vec3 vColor;
varying float vAlpha;
varying float vRotation;
uniform float uTime;

varying vec2 vUv;

attribute float aAlpha;
attribute float aRotation;
attribute float aSize;


mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0);
}

void main()
{
    vColor = color;
    vAlpha = aAlpha;
    vRotation = aRotation;
    vUv = uv;

    mat4 rYPos = rotationMatrix(vec3(0.0, 1.0, 0.0), uTime*120.0);
    /*mat4 rYPos = mat4(vec4(cos(uTime),0.0,sin(uTime),0.0),
    vec4(0.0,1.0,0.0,0.0),
    vec4(-sin(uTime),0.0,cos(uTime),0.0),
    vec4(0.0,0.0,0.0,1.0));*/

    vec4 newPosition = rYPos * vec4(position, 1.0);

    newPosition.x = newPosition.x / 350.0 + position.x;
    newPosition.z = newPosition.z / 350.0 + position.z;


    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //modelPosition *= rYPos;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_PointSize = aSize;
    gl_PointSize *= ( 1000.0 * 0.5 / - viewPosition.z );
    //bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );
    //if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

    gl_Position = projectedPosition;
}