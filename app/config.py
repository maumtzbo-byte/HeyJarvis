from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_key: str = ""

    anthropic_api_key: str = ""
    claude_model: str = "claude-3-5-sonnet-20241022"

    chroma_persist_dir: str = "./chroma_data"

    # Orígenes permitidos para CORS (ej. la URL del dashboard web),
    # separados por coma. "*" permite cualquier origen (default en dev).
    allowed_origins: str = "*"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
