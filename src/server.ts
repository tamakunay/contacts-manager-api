import "dotenv/config"
import { connect } from "./lib/db"
import { createApp } from "./app"
import { PORT } from "./config"

connect()

const app = createApp()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
