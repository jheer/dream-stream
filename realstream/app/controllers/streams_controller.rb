class StreamsController < ApplicationController
  # GET /streams
  # GET /streams.json
  def index
    @streams = Stream.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @streams }
    end
  end

  # GET /streams/1
  # GET /streams/1.json
  def show
    @stream = Stream.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @stream }
    end
  end

  # GET /streams/new
  # GET /streams/new.json
  def new
    @stream = Stream.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @stream }
    end
  end

  # GET /streams/1/edit
  def edit
    @stream = Stream.find(params[:id])
  end

  # POST /streams
  # POST /streams.json
  def create
    @stream = Stream.new(params[:stream])
    Juggernaut.publish("channel1", @stream.url) 
    @stream.save

    redirect_to :new_stream

    # respond_to do |format|
    #   # if false #@stream.save
    #   #   format.html { redirect_to @stream, notice: 'Stream was successfully created.' }
    #   #   format.json { render json: @stream, status: :created, location: @stream }
    #   # else
    #   redirect_to :new_stream
      #  format.html { render action: "new" }
      #   format.json { render json: @stream.errors, status: :unprocessable_entity }
      # end
    # end
  end

  # PUT /streams/1
  # PUT /streams/1.json
  def update
    @stream = Stream.find(params[:id])

    respond_to do |format|
      if @stream.update_attributes(params[:stream])
        format.html { redirect_to @stream, notice: 'Stream was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @stream.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /streams/1
  # DELETE /streams/1.json
  def destroy
    @stream = Stream.find(params[:id])
    @stream.destroy

    respond_to do |format|
      format.html { redirect_to streams_url }
      format.json { head :no_content }
    end
  end
end
