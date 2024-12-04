from pathlib import Path
import os
import secrets


ROOT_PATH =  Path(__file__).parent.parent
APP_PATH = ROOT_PATH / 'app'


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', secrets.token_hex(32))  # Generate a random 32-byte key as the default value
    DEBUG = False
    

class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(Config):
    DEBUG = False


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    production=ProductionConfig
)
