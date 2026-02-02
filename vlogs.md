# Version Logs
We've got some versions right now. View them.

## V 1.0 
[here](https://dev1012-lzh.github.io/bmark-1/v1.0/index.html)

## V 1.6 
[here](https://dev1012-lzh.github.io/bmark-1/v1.6/index.html)
### Improvements made:
1. Colourful blocks
2. FPS shutter even with a good GPU at high FPS (camera shaking) by applying the display's refresh rate to the 3D's cam' FPS.
3. Smoother transitions

## V2.0
[here](https://dev1012-lzh.github.io/bmark-1/v2.0/index.html)
1. Geometry: Switched to Torus Knots (High-poly complex curves).
2. Advanced Shaders: Implemented Refractive Glass PBR. GPU now calculates light bending and transparency sorting.
3. Lighting: Upgraded to PCSS (Contact Hardening Shadows) with 4K maps. Shadows now blur dynamically based on distance.
4. Post-Processing: Added SSAO 2.0 (Screen Space Ambient Occlusion) and Chromatic Aberration.
5. Antialiasing: Maxed out at MSAA x8.
6. Stress Level: High. Forces massive vertex processing and complex per-pixel calculatios.
7. Added "Safety Watchdog": Real-time monitoring of frame timings.
8. Auto-Abort Logic: System automatically kills the process if FPS drops below 10 FPS for 3 seconds to prevent system crashes.
9. Emergency Brake: Added Space and Escape listeners for manual memory disposal.
10. Optimization: Forced High-Performance Power Preference in the WebGL engine configuration.
