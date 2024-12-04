#!/usr/bin/env python

from setuptools import find_packages, setup

VERSION = "0.0.1"

requires = [
    "flask==3.1.0",
    "flask-cors==5.0.0",
]

setup(
    name="simple-web-app",
    version=VERSION,
    author="tutor",
    description="Simple application to integrating Flask API, Vite frontend interface, Neo4j and a core package",
    packages=find_packages(include=['app', 'app.*']),
    zip_safe=False,
    install_requires=requires,
    python_requires=">=3.10",  # Specify the required Python version
    include_package_data=True,
    package_data={
        "": ["VERSION"],  # Include VERSION in the package root
    }
)
