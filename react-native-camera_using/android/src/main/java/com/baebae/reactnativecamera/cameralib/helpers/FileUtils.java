package com.baebae.reactnativecamera.cameralib.helpers;

import android.os.Environment;

import java.io.File;

/**
 * Created by baebae on 12/31/15.
 */
public class FileUtils {
    /**
     * get Device App folder path in sdcard
     * @return
     */
    public final static String      APP_NAME = "Temp";
    public synchronized static String getApplicationDirectory()
    {
        String dirName = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + APP_NAME + File.separator;
        File directory = new File(dirName);
        directory.mkdirs();
        return dirName;
    }
}
