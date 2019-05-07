 "use strict";
 
 


function main() {
		var canvas = document.getElementById("c");
		var gl = canvas.getContext("webgl2");
		if (!gl) {
			alert("No WEBGL for you! Try a different browser");
			return;
		}

	
}

/**
 * Creates and compiles a shader.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType The type of shader, VERTEX_SHADER or
 *     FRAGMENT_SHADER.
 * @return {!WebGLShader} The shader.
 */
function compileShader(gl, shaderSource, shaderType) {
  // Create the shader object
  var shader = gl.createShader(shaderType);
 
  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);
 
  // Compile the shader
  gl.compileShader(shader);
 
  // Check if it compiled
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // Something went wrong during compilation; get the error
    throw "could not compile shader:" + gl.getShaderInfoLog(shader);
  }
 
  return shader;
}

/**
 * Creates a program from 2 shaders.
 *
 * @param {!WebGLRenderingContext) gl The WebGL context.
 * @param {!WebGLShader} vertexShader A vertex shader.
 * @param {!WebGLShader} fragmentShader A fragment shader.
 * @return {!WebGLProgram} A program.
 */
function createProgram(gl, vertexShader, fragmentShader) {
  // create a program.
  var program = gl.createProgram();
 
  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
 
  // link the program.
  gl.linkProgram(program);
 
  // Check if it linked.
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
      // something went wrong with the link
      throw ("program filed to link:" + gl.getProgramInfoLog (program));
  }
 
  return program;
};

var vertexShaderSource = `#version 300 es
 
in vec4 a_position;
uniform mat4 u_matrix;
 
void main() {
   gl_Positon = u_matrix * a_position;
}
`;

// document.getElementById("myButton").onclick = function () {
    // gameInstance.SendMessage('RedCube', 'ToggleGameObject');
// }

// var currentprice = 2000;

// function animatevalue(id, start, end, duration) {
    // var range = end - start;
    // var current = start;
    // var increment = end > start ? 1 : -1;
    // var steptime = math.abs(math.floor(duration / range));
    // var obj = document.getelementbyid(id);
    // var timer = setinterval(function () {
        // current += increment;
        // obj.innerhtml = current;
        // if (current === end) {
            // clearinterval(timer);
        // }
    // }, steptime);
// }

// animatevalue("price-total", currentprice, 25, 10);

main();