FROM python

WORKDIR /code 

COPY ./requirements.txt ./

RUN apt-get update && apt-get install git -y

RUN pip install --no-cache-dir -r requirements.txt

# install the whisper directly from source
RUN pip install "git+https://github.com/openai/whisper.git"

# we need ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

COPY ./src ./src

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
