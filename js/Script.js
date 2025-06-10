function main() {
    const windowWidth = 512;
    const windowHeight = 380;
    InitWindow(windowWidth, windowHeight, "Dapper Dasher");

    const gravity = 1000;

    const nebula = LoadTexture("textures/12_nebula_spritesheet.png");
    let nebRec = { x: 0.0, y: 0.0, width: nebula.width / 8, height: nebula.height / 8 };
    let nebPos = { x: windowWidth, y: windowHeight - nebRec.height };

    let nebframe = 0;
    const nebUpdateTime = 1.0 / 12.0;
    let nebRunningTime = 0;

    const nebVel = -200;

    const scarfy = LoadTexture("textures/scarfy.png");
    let scarfyRec = {
        x: 0,
        y: 0,
        width: scarfy.width / 6,
        height: scarfy.height
    };
    let scarfyPos = {
        x: windowWidth / 2 - scarfyRec.width / 2,
        y: windowHeight - scarfyRec.height
    };

    let frame = 0;
    const updateTime = 1.0 / 12.0;
    let runningTime = 0;

    const JumpVel = -600;

    let isInAir = false;
    let velocity = 0;

    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        const dT = GetFrameTime();

        scarfyPos.y += velocity * dT;

        BeginDrawing();
        ClearBackground(WHITE);

        if (scarfyPos.y >= windowHeight - scarfyRec.height) {
            velocity = 0;
            isInAir = false;
        } else {
            velocity += gravity * dT;
            isInAir = true;
        }

        if (IsKeyPressed(KEY_SPACE) && !isInAir) {
            velocity = JumpVel;
        }

        nebPos.x += nebVel * dT;

        scarfyPos.y += velocity * dT;

        if (!isInAir) {
            runningTime += dT;
            if (runningTime >= updateTime) {
                runningTime = 0.0;
                scarfyRec.x = frame * scarfyRec.width;
                frame++;
                if (frame > 5) {
                    frame = 0;
                }
            }
        }

        nebRunningTime += dT;
        if (nebRunningTime >= nebUpdateTime) {
            nebRunningTime = 0.0;
            nebRec.x = nebframe * nebRec.width;
            nebframe++;
            if (nebframe > 7) {
                nebframe = 0;
            }
        }

        DrawTextureRec(nebula, nebRec, nebPos, WHITE);
        DrawTextureRec(scarfy, scarfyRec, scarfyPos, WHITE);

        EndDrawing();
    }

    UnloadTexture(scarfy);
    UnloadTexture(nebula);
    CloseWindow();
}