from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_key: str = ""

    anthropic_api_key: str = ""
    claude_model: str = "claude-3-5-sonnet-20241022"

    chroma_persist_dir: str = "./chroma_data"

    # Auth simple para el MVP: si se deja vacío, los endpoints protegidos
    # no exigen header. Poner un valor aquí para exigir X-API-Key.
    app_api_key: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
